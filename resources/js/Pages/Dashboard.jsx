import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const data = {
            title,
            desc,
            category,
        };

        Inertia.post("/news", data);
        setIsNotif(true);
        setTitle("");
        setDesc("");
        setCategory("");
    }

    useEffect(() => {
        if(!props.myNews) {
            Inertia.get('/news')
        }
        return;
    }, [])

       

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    List Berita
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {isNotif && (
                            <div className="alert alert-success shadow-lg">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current flex-shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{props.flash.message}</span>
                                </div>
                            </div>
                        )}
                        <input
                            type="text"
                            onChange={(title) => setTitle(title.target.value)}
                            value={title}
                            placeholder="Judul"
                            className="input input-bordered w-full m-2"
                        />
                        <input
                            type="text"
                            onChange={(desc) => setDesc(desc.target.value)}
                            value={desc}
                            placeholder="Deskripsi"
                            className="input input-bordered w-full m-2"
                        />
                        <input
                            type="text"
                            onChange={(category) =>
                                setCategory(category.target.value)
                            }
                            value={category}
                            placeholder="Kategori"
                            className="input input-bordered w-full m-2"
                        />
                        <button
                            onClick={() => handleSubmit()}
                            className="btn btn-primary m-2"
                        >
                            Simpan
                        </button>
                    </div>
                    <div className="p-4">
                        {props.myNews && props.myNews.length > 0 ? props.myNews.map((news, i) => {
                            return(
                                <div key={i} className="card m-4 w-full lg:w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">
                                    {news.title}
                                    {/* <div className="badge badge-secondary">NEW</div> */}
                                </h2>
                                <p>{news.desc}</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-inline">
                                        {news.category}
                                    </div>
                                    <div className="badge badge-outline">
                                        <Link href={route('edit.news')} method="get" data={{id: news.id}} as="button">
                                        Edit
                                        </Link>
                                    </div>
                                    <div className="badge badge-outline">
                                    <Link href={route('delete.news')} method="post" data={{id: news.id}} as="button">
                                        Delete
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                                )
                        }) : <p>Anda belum memiliki berita</p>}
                    
                    </div>
                        
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
