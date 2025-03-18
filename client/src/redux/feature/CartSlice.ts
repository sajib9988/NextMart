import { IProducts } from "@/type/products";

export interface CartProduct extends IProducts {
  orderQuantity: number;
}

interface InitialState{
    products: CartProduct[];
    city : string;
    shippingAddress: string;


}


const initialState: InitialState = {
    products: [],
    city: "",
    shippingAddress: "",
  };

  const CartSlice = createSlice({

       name: "cart",
         initialState,
         reducers:{
              addProduct:(state, action)=>{
                const productToAdd=state.products.find((product)=> product._id === action.payload._id);

                if (productToAdd) {
                    productToAdd.orderQuantity += 1;
                    return;
                  }

                  state.products.push({ ...action.payload, orderQuantity: 1 });
            }
       


         }




  })