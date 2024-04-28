import { Link, useLocation } from "react-router-dom";

const Tabs = () => {
  const location = useLocation().pathname;

  return (
    <div className="grid text-center grid-cols-2">
      <Link
        to={"/"}
        className={`font-semibold border-b pb-3 border-white hover:opacity-100 ${
          location !== "/" && "opacity-30"
        }`}
      >
        Untukmu
      </Link>
      <Link
        to={"/following"}
        className={`font-semibold border-b pb-3 border-white hover:opacity-100 ${
          location !== "/following" && "opacity-30"
        }`}
      >
        Mengikuti
      </Link>
    </div>
  );
};

export default Tabs;
