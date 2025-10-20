import axios from "axios";
import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";

export const BrandContext = createContext();

export default function BrandContextProvider(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { token } = useContext(AuthContext);

  const [brands, setBrands] = useState([]);
  async function getAllBrands() {
    setIsLoading(true);
    try {
      if (!token) return;

      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      if (!localStorage.getItem("UserToken")) return;

      setBrands(data?.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <BrandContext.Provider value={{ brands, isLoading, error }}>
      {props.children}
    </BrandContext.Provider>
  );
}
