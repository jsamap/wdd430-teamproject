// Deliverable.tsx
import type { Deliverable } from "@/app/lib/actions/local.actions";

type DeliverableProps = {
  order: Deliverable;
};

export default function DeliverableComponent({ order }: DeliverableProps) {
  return (
    <div className="border p-4 mb-6 rounded">
      <p className="font-semibold">Order ID: {order.id}</p>
      <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
      <p>Status: {order.status}</p>
      <p>Total: ${order.total.toFixed(2)}</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p>{item.name}</p>
              <p>
                ${item.price} × {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
