import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Navbar from "@/Components/Navbar";
import Newslists from "@/Components/Homepage/NewsLists";
import Paginate from "@/Components/Homepage/Paginate";


export default function Homepage(props) {
    return (
        <div className="min-h-screen bg-gray-300">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:item-stretch item-center gap-4 p-4">
               <Newslists news={props.news.data}/>
            </div>
            <div className="flex justify-center items-center">
                <Paginate meta={props.news.meta}/>
            </div>
        </div>
    );
}
