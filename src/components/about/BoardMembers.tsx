export default function BoardMembers() {
    const members = [
        {
            name: "الشيخ/ عبدالعزيز بن",
            title: "محمد بن صالح السيف"
        },
        {
            name: "الشيخ/ عبدالله بن ناصر",
            title: "بن محمد المخيربش"
        },
        {
            name: "الدكتور/ عمر بن سعيد بن",
            title: "محمد آل مبطي"
        },
        {
            name: "الدكتور/ يوسف بن سعيد",
            title: "بن حمدان الغامدي"
        }
    ];

    return (
        <div className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    <span className="text-secondary me-2">أعضاء</span>
                    <span className="text-primary"> مجلس الإدارة</span>
                </h1>

                {/* Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
                    {members.map((member, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {/* Avatar Circle */}
                            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-950 to-indigo-900 flex items-center justify-center mb-6 shadow-lg">
                                <div className="relative">
                                    {/* Head */}
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 via-pink-200 to-purple-200 mx-auto mb-1"></div>
                                    {/* Body */}
                                    <div className="w-16 h-12 bg-gradient-to-br from-pink-300 via-pink-200 to-purple-300 rounded-t-full"></div>
                                </div>
                            </div>

                            {/* Name */}
                            <div className="text-center">
                                <p className="text-blue-900 font-bold text-lg leading-relaxed">
                                    {member.name}
                                </p>
                                <p className="text-blue-900 font-bold text-lg leading-relaxed">
                                    {member.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}