import ProductDetailsScreen from "@/features/products/screens/product-Details.screen";

type ProductDetailsPageProps ={
    params: Promise<{id: string}>
}


export default async function productDetails({params}:ProductDetailsPageProps) {
    const {id} = await params;
    return <>
    <ProductDetailsScreen productId={id}/>
    
    </>
}