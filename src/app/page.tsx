import { useState } from "react";

export default function Home() {
  const [order, setOrder] = useState<OrderData>({
    orderTime: "",
    productList: [],
  });
  return (
    <div className="flex gap-4">
      <ul className="w-full">
        <li>
          <div>사과</div>
          <div>1000원</div>
          <div>
            <button>담기</button>
          </div>
        </li>
        <li>
          <div>배</div>
          <div>2000원</div>
          <div>
            <button>담기</button>
          </div>
        </li>
      </ul>
      <div className="w-full">
        <h2>주문목록</h2>
        {order.productList.map((product) => (
          <div key={product.name}>
            {product.name} {product.price}원 {product.quantity}개
          </div>
        ))}
        <button>주문하기</button>
      </div>
    </div>
  );
}
