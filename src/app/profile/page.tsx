export default function Profile() {
    return (
        <section id="profile" className="px-3 py-2 text-slate-900">
            <h2 className="bg-slate-100 text-xl p-2">MY PROFILE</h2>
            <div className="p-2 bg-white shadow-xl">
                {/* <img src={} className="rounded-full" id="photo" /> */}
                <div className="flex space-x-10" id="name"></div>
                <div className="flex space-x-10" id="email"></div>
                <div className="flex space-x-10" id="role"></div>
                <div className="flex space-x-10" id="updatedAt"></div>
                <div className="flex space-x-10" id="button"></div>
            </div>
        </section>
    )
}