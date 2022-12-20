import HeadCustom from "../components/HeadCustom";
import Header from "../components/Header";

const Pricing = () => {
    return (
        <>
        <HeadCustom title="Plan"/>
        <Header />
        <main className="flex flex-col items-start justify-center p-10">
            <div className='pb-5'>
                <h1 className=' text-2xl font-medium'>PRICING PACKAGES</h1>
            </div>
            <div className='border-b border-gray-300 mb-2 w-full'></div>
            <div className="w-full flex items-center justify-evenly space-x-10 pt-5">
                <div className="w-full border">
                    <div className="h-0.5 bg-gradient-to-r from-rose-500 to-rose-900 w-full"></div>
                    hello
                </div>
                <div className="w-full border">
                    <div className="h-0.5 bg-gradient-to-r from-rose-500 to-rose-900 w-full"></div>
                    hello
                </div>
                <div className="w-full border">
                    <div className="h-0.5 bg-gradient-to-r from-rose-500 to-rose-900 w-full"></div>
                    hello
                </div>
            </div>
        </main>
        </>
    )
}
export default Pricing;
