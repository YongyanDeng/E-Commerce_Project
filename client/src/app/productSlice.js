import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    fetchProducts,
    fetchOneProduct,
    createProduct,
    deleteProduct,
    updateProduct,
} from "services/products";
import { removeError, addError } from "./errorSlice";

const initialState = {
    products: [],
    oneProduct: null,
    status: "idle",
};

export const fetchProductsAction = createAsyncThunk(
    "products/fetchProducts",
    async (data, thunkAPI) => {
        try {
            const products = await fetchProducts(data);
            thunkAPI.dispatch(removeError());
            return products;
        } catch (err) {
            thunkAPI.dispatch(addError(err.message));
            return thunkAPI.rejectWithValue(err.message);
        }
    },
);

export const fetchOneProductAction = createAsyncThunk(
    "products/fetchOneProduct",
    async (data, thunkAPI) => {
        try {
            const oneProduct = await fetchOneProduct(data);
            thunkAPI.dispatch(removeError());
            return oneProduct;
        } catch (err) {
            thunkAPI.dispatch(addError(err.message));
            return thunkAPI.rejectWithValue(err.message);
        }
    },
);

export const createProductAction = createAsyncThunk(
    "products/createProduct",
    async (data, thunkAPI) => {
        try {
            const product = await createProduct(data);
            thunkAPI.dispatch(removeError());
            return product;
        } catch (err) {
            thunkAPI.dispatch(addError(err.message));
            return thunkAPI.rejectWithValue(err.message);
        }
    },
);

export const deleteProductAction = createAsyncThunk(
    "products/deleteProduct",
    async (data, thunkAPI) => {
        try {
            const product = await deleteProduct(data);
            thunkAPI.dispatch(removeError());
            return product;
        } catch (err) {
            thunkAPI.dispatch(addError(err.message));
            return thunkAPI.rejectWithValue(err.message);
        }
    },
);

export const updateProductAction = createAsyncThunk(
    "products/updateProduct",
    async (data, thunkAPI) => {
        try {
            const product = await updateProduct(data);
            thunkAPI.dispatch(removeError());
            return product;
        } catch (err) {
            thunkAPI.dispatch(addError(err.message));
            return thunkAPI.rejectWithValue(err.message);
        }
    },
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // loadProducts: (state, action) => {
        //     state.status = 'pending';
        //     state.products = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
            state.status = "successed";
            state.products = action.payload;
        });
        builder.addCase(fetchProductsAction.rejected, (state, action) => {
            state.status = "failed";
        });
        builder.addCase(fetchProductsAction.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(fetchOneProductAction.fulfilled, (state, action) => {
            state.status = "successed";
            state.oneProduct = action.payload;
        });
        builder.addCase(fetchOneProductAction.rejected, (state, action) => {
            state.status = "failed";
        });
        builder.addCase(fetchOneProductAction.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(createProductAction.fulfilled, (state, action) => {
            state.status = "successed";
            state.products.push(action.payload);
        });
        builder.addCase(createProductAction.rejected, (state, action) => {
            state.status = "failed";
        });
        builder.addCase(createProductAction.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(deleteProductAction.fulfilled, (state, action) => {
            state.status = "successed";
            state.products = state.products.filter((product) => product._id !== action.payload._id);
        });
        builder.addCase(deleteProductAction.rejected, (state, action) => {
            state.status = "failed";
        });
        builder.addCase(deleteProductAction.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(updateProductAction.fulfilled, (state, action) => {
            state.status = "successed";
            const productIndex = state.products.findIndex(
                (product) => product._id === action.payload._id,
            );
            state.products[productIndex] = action.payload;
        });
        builder.addCase(updateProductAction.rejected, (state, action) => {
            state.status = "failed";
        });
        builder.addCase(updateProductAction.pending, (state, action) => {
            state.status = "pending";
        });
    },
});

export const { loadProducts } = productSlice.actions;
export default productSlice.reducer;
