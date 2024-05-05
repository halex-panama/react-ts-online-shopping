import { Products } from "../store/productsSlice";
import { ProductCard } from "./";

type Props = {
  products: Products[];
};

const ProductList = ({ products }: Props) => {
  return (
    <div className="product-list grid my-3">
      {products &&
        products.length &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductList;
