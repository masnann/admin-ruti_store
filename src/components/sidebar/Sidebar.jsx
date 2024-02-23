import React, { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLast, ChevronFirst } from "lucide-react";
import {
  HiUserGroup,
  HiCreditCard,
  HiShoppingCart,
  HiPencil,
  HiViewList,
  HiLogout,
  HiPhotograph,
  HiStar,
  HiShoppingBag,
  HiPresentationChartBar,
} from "react-icons/hi";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full inline-flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://res.cloudinary.com/dufa4bel6/image/upload/v1706312426/disappear/admin-loo_ip6ijw.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            <SidebarItem icon={<HiPresentationChartBar/>} text="Dasbor" link="/" />
            <SidebarItem
              icon={<HiUserGroup />}
              text="Pelanggan"
              link="/customer"
            />
            <SidebarItem
              icon={<HiViewList />}
              text="Kategori"
              link="/category"
            />
            <SidebarItem
              icon={<HiPhotograph />}
              text="Carousel"
              link="/carousel"
            />
            <SidebarItem icon={<HiShoppingBag />} text="Produk" link="/products" />
            <SidebarItem
              icon={<HiCreditCard />}
              text="Pembayaran"
              link="/payments"
            />
            <SidebarItem
              icon={<HiShoppingCart />}
              text="Pesanan"
              link="/orders"
            />
            <SidebarItem icon={<HiStar />} text="Ulasan" link="/review" />
            <SidebarItem
              icon={<HiPencil />}
              text="Artikel"
              link="/blog-posts"
            />

            {children}
          </ul>
        </SidebarContext.Provider>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            <SidebarItem icon={<HiLogout />} text="Keluar" link="/logout" />
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, link }) {
  const { expanded } = useContext(SidebarContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <li
      onClick={handleClick}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          window.location.pathname === link
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
