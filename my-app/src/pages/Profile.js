import Image from "next/image";

function Staff({ name, staff_type }) {
    var imageSrc = "";
    if(staff_type === "nurse") {
        imageSrc = "/img/nurse.png";
    } else if(staff_type === "doctor") {
        imageSrc = "/img/doctor.png";
    }
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center">
            <Image src={imageSrc} alt={name} className="dark:invert mb-2" width={100} height={100} priority />
            <p className="text-center font-medium">{name}</p>
        </div>
    );
}

export default function Profile() {
    const staffs = [
        { name: "Name 1 Surname 1", staff_type: "nurse" },
        { name: "Name 2 Surname 2", staff_type: "nurse" },
        { name: "Name 3 Surname 3", staff_type: "doctor" },
        { name: "Name 4 Surname 4", staff_type: "doctor" },
    ];

    return (
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Staff Lists</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {staffs.map((staff, index) => (
                    <Staff key={index} name={staff.name} staff_type={staff.staff_type} />
                ))}
            </div>
        </section>
    );
}