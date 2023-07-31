import React, { lazy, useEffect } from "react";
import { useSelector } from "react-redux";

// Store
import {
  selectContainers,
  selectInitProduct,
  selectOrder,
} from "./store/slice/containerSlice";
import { useAppDispatch } from "./store/configStore";
import {
  Product,
  buyProduct,
  setNewImage,
} from "./store/slice/containerReducer";

function App() {
  const RelatedProduct = lazy(() => import("./components/relatedProduct"));

  const dispatch = useAppDispatch();

  const products = useSelector(selectContainers);
  const product = useSelector(selectInitProduct);
  const order = useSelector(selectOrder);

  const onClickChangeProduct = (product: Product) => {
    dispatch(setNewImage(product));
  };

  const onClickBuyProduct = () => {
    dispatch(buyProduct(1));
  };

  useEffect(() => {
    // Hàm xử lý sự kiện nhận thông điệp từ iframe
    const handleMessage = (event: any) => {
      // Kiểm tra origin của frame để đảm bảo rằng thông điệp chỉ đến từ đúng nguồn
      if (event.origin === "http://localhost:3001") {
        // Nhận thông điệp từ iframe
        const { type, payload } = event.data;

        if (type === "CHANGE_IMAGE") {
          dispatch(setNewImage({ ...payload }));
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Khi unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <React.Suspense fallback={null}>
      <div
        style={{ width: 1000, height: 600 }}
        className="relative container mx-auto flex flex-row m-10 border-dashed border-2 border-red-500 rounded"
      >
        <div className="absolute -top-7 text-red-500 font-bold">
          Team Core (
          <a href="#" rel="noreferrer">
            container
          </a>
          )
        </div>
        <div className="flex flex-col w-full p-5" style={{ width: 790 }}>
          <div className="flex flex-row w-full justify-between">
            <h1 className="text-lg font-bold">The Model Store</h1>
            <div>Orders: {order} items</div>
          </div>
          <div className="flex flex-row">
            <div className="w-2/3">
              <img alt="" src={product.image} />
            </div>
            <div className="w-1/2 pt-10">
              <label className="text-lg font-medium">{product.title}</label>
              <ul className="flex flex-row">
                {products.map((product) => (
                  <li
                    onClick={() => onClickChangeProduct(product)}
                    key={product.id}
                    className="cursor-pointer border-b-2 border-white hover:border-gray-300"
                  >
                    <img alt="" src={product.image} />
                  </li>
                ))}
              </ul>
              <button
                onClick={onClickBuyProduct}
                className="font-medium hover:bg-gray-50 border border-gray-300 rounded p-3 mt-10"
              >
                Buy for 66,00 $
              </button>
            </div>
          </div>
        </div>
        <div className="p-1" style={{ width: 210 }}>
          <iframe className="w-full h-full" src="http://localhost:3001/" />
        </div>
      </div>
    </React.Suspense>
  );
}

export default App;
