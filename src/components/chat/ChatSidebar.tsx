"use client";

import { Plus, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { getMyTickets, createTicket } from "@/actions/contact-us.actions";

interface Ticket {
    id: number;
    ticket_number: string;
    chat_room_id: string;
    message: string;
    status: string;
}

interface ChatSidebarProps {
    selectedId: string;
    onSelectConversation: (ticketNumber: string, chatRoomId: string, message: string, status: string) => void;
}

export function ChatSidebar({ selectedId, onSelectConversation }: ChatSidebarProps) {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showNewTicketInput, setShowNewTicketInput] = useState(false);
    const [newTicketMessage, setNewTicketMessage] = useState("");
    const [isCreatingTicket, setIsCreatingTicket] = useState(false);

    const fetchTickets = async () => {
        setIsLoading(true);
        const result = await getMyTickets();
        if (result.success && result.data) {
            setTickets(result.data.tickets);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleCreateTicket = async () => {
        if (newTicketMessage.trim()) {
            setIsCreatingTicket(true);
            try {
                const result = await createTicket(newTicketMessage);
                if (result.success) {
                    setNewTicketMessage("");
                    setShowNewTicketInput(false);
                    
                    await fetchTickets();
                    
                    if (result.data?.ticket) {
                        const newTicket = result.data.ticket;
                        onSelectConversation(
                            newTicket.ticket_number,
                            newTicket.chat_room_id,
                            newTicket.message,
                            newTicket.status
                        );
                    }
                } else {
                    alert(result.error || "حدث خطأ أثناء إنشاء التذكرة");
                }
            } catch (error) {
                console.error("Error creating ticket:", error);
                alert("حدث خطأ أثناء إنشاء التذكرة");
            } finally {
                setIsCreatingTicket(false);
            }
        }
    };

    const filteredTickets = tickets.filter(ticket => 
        ticket.ticket_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "new":
                return "جديد";
            case "in_progress":
                return "جاري العمل";
            case "closed":
                return "مغلق";
            default:
                return status;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new":
                return "bg-blue-100 text-blue-600";
            case "in_progress":
                return "bg-amber-100 text-amber-600";
            case "closed":
                return "bg-red-100 text-red-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="w-[330px] border-l border-gray-200 flex flex-col h-full bg-white">
            {/* Header */}
            <div className="px-5 py-5 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-gray-800 font-bold text-xl">تذاكر الدعم</h2>
                        <span className="text-primary font-bold text-base bg-primary/10 rounded-full px-3 py-1 min-w-[36px] text-center">
                            {tickets.length}
                        </span>
                    </div>
                    <button
                        onClick={() => setShowNewTicketInput(!showNewTicketInput)}
                        className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all shadow-sm hover:shadow-md active:scale-95"
                        title="إنشاء تذكرة جديدة"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                {/* Search Bar */}
                <div>
                    <input
                        type="text"
                        placeholder="ابحث عن تذكرة..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-right bg-white border border-gray-200 h-11 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* New Ticket Input */}
            {showNewTicketInput && (
                <div className="px-5 py-4 border-b border-gray-200 bg-blue-50/50">
                    <textarea
                        value={newTicketMessage}
                        onChange={(e) => setNewTicketMessage(e.target.value)}
                        placeholder="اكتب رسالتك هنا..."
                        className="w-full text-right bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[100px] resize-none placeholder:text-gray-400"
                        autoFocus
                    />
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={handleCreateTicket}
                            disabled={isCreatingTicket || !newTicketMessage.trim()}
                            className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all font-medium shadow-sm hover:shadow-md"
                        >
                            {isCreatingTicket ? "جاري الإنشاء..." : "إنشاء تذكرة"}
                        </button>
                        <button
                            onClick={() => {
                                setShowNewTicketInput(false);
                                setNewTicketMessage("");
                            }}
                            className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                        >
                            إلغاء
                        </button>
                    </div>
                </div>
            )}

            {/* Tickets List */}
            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12 text-gray-400">
                        <div className="text-center">
                            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3"></div>
                            <p>جاري التحميل...</p>
                        </div>
                    </div>
                ) : filteredTickets.length === 0 ? (
                    <div className="flex items-center justify-center py-12 px-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <MessageSquare className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-sm">لا توجد تذاكر</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {filteredTickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                onClick={() => onSelectConversation(
                                    ticket.ticket_number,
                                    ticket.chat_room_id,
                                    ticket.message,
                                    ticket.status
                                )}
                                className={`px-5 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-all ${
                                    selectedId === ticket.ticket_number 
                                        ? "bg-primary/5 border-l-4 border-l-primary" 
                                        : ""
                                }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-primary font-bold text-base">
                                        {ticket.ticket_number}
                                    </h3>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(ticket.status)}`}
                                    >
                                        {getStatusLabel(ticket.status)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 text-right line-clamp-2 leading-relaxed">
                                    {ticket.message}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}