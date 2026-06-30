import { useEffect, useState } from "react";
import { notificationService } from "../../services/notificationService";

export default function NotificationsDrawer({ trigger }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (open) notificationService.list().then(setItems).catch(() => setItems([]));
  }, [open]);

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/40" onClick={() => setOpen(false)}>
          <section className="absolute right-0 top-0 h-full w-full max-w-md border-l border-line bg-panel p-5" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <button className="rounded-md border border-line px-3 py-1 text-sm" onClick={() => setOpen(false)}>Close</button>
            </div>
            <div className="mt-5 space-y-3">
              {items.map((item) => (
                <article key={item._id} className="rounded-lg border border-line bg-ink p-3">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.message}</p>
                </article>
              ))}
              {!items.length && <p className="text-sm text-slate-400">No notifications yet.</p>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
