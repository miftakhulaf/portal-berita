import React, { useState } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Navbar from "@/Components/Navbar";
import { Inertia } from "@inertiajs/inertia";

export default function EditNews(props) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = () => {
        const data = {
            id: props.myNews.id,
            title,
            desc,
            category,
        };

        Inertia.post("/news/update", data);
        setTitle("");
        setDesc("");
        setCategory("");
    };
    return (
        <div className="min-h-screen bg-gray-300">
            <Head title="AlNews" />
            <Navbar user={props.auth.user} />

            <div className="card m-4 w-full lg:w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <input
                        type="text"
                        onChange={(title) => setTitle(title.target.value)}
                        defaultValue={props.myNews.title}
                        placeholder="Judul"
                        className="input input-bordered w-full m-2"
                    />
                    <input
                        type="text"
                        onChange={(desc) => setDesc(desc.target.value)}
                        defaultValue={props.myNews.desc}
                        placeholder="Deskripsi"
                        className="input input-bordered w-full m-2"
                    />
                    <input
                        type="text"
                        onChange={(category) =>
                            setCategory(category.target.value)
                        }
                        defaultValue={props.myNews.category}
                        placeholder="Kategori"
                        className="input input-bordered w-full m-2"
                    />
                    <button
                        onClick={() => handleSubmit()}
                        className="btn btn-primary m-2"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
