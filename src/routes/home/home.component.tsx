import { Link } from "react-router-dom";
import "./home.styles.scss"
import Navbar from "../../components/navbar/navbar.component";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col mx-16 items-center mt-[100px] gap-6">
        <span className="font-bold text-3xl text-center">
          Build the habits that{" "}
          <span className="text-customRed">matter!</span>
        </span>

        <p className="text-center text-sm sm:w-[430px]  w-[370px]">
          Need help completing your habits? Work with your friends to achieve your goals.
        </p>
        <Link className="block text-sm font-bold rounded-lg px-9 py-3 text-white transition bg-customRed focus:outline-none"
          type="button"
          to={"/dashboard"}>
          Lets get started 
          </Link>
        </div>
    </>
  );
}

export default Home;