import { faCartShopping, faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const CartNotFound = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="notFound">
            <FontAwesomeIcon icon={faCartShopping} />
            <h2> ТАНЫ САГС </h2>
            <p> хоосон байна</p>
            <Link href="/"> Нүүр хуудас</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartNotFound;
