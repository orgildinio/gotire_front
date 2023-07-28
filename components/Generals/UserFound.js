import {
  faCartShopping,
  faInbox,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const UserNotFound = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="notFound">
            <FontAwesomeIcon icon={faUser} />
            <h2> НЭВТЭРЧ </h2>
            <p> орно уу</p>
            <Link href="/login"> Нэвтрэх </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserNotFound;
