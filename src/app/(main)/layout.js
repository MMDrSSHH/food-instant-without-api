import MenuTopbar from "@/components/topbar/MenuTopbar";

function MainLoyout({ children }) {
  return (
    <>
      <header className="w-[90%] mx-auto">
        <MenuTopbar />
      </header>
      {children}
    </>
  );
}

export default MainLoyout;
