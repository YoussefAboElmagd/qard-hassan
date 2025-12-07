"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactUs } from "@/actions/contact-us.actions";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

interface ContactUsData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const t = useTranslations("contactUs");

  const contactUsSchema = z.object({
    name: z.string().nonempty(t("validation.nameRequired")),
    email: z.string().nonempty(t("validation.emailRequired")).email(t("validation.emailInvalid")),
    message: z.string().nonempty(t("validation.messageRequired")).min(10, t("validation.messageMinLength")),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactUsData>({
    resolver: zodResolver(contactUsSchema),
    criteriaMode: "all",
    mode: "onChange",
  });

  const handleContactUs = async (data: ContactUsData) => {
    try {
      const response = await contactUs(data);
      if (response.success) {
        setSuccessMessage(response.message || t("success.message"));
        setShowModal(true);
        reset();
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleContactUs)} className="space-y-4 sm:space-y-5 flex flex-col h-full">
        <div>
          <label className="text-gray-600 font-bold text-sm sm:text-base" htmlFor="name">{t("form.name")}</label>
          <input
            id="name"
            type="text"
            placeholder={t("form.namePlaceholder")}
            className="block border-[1px] border-sidebar-ring w-full py-2 sm:py-3 px-3 mt-1 rounded-md focus:outline-0 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors text-sm sm:text-base"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-gray-600 font-bold text-sm sm:text-base" htmlFor="email">{t("form.email")}</label>
          <input
            type="email"
            id="email"
            placeholder={t("form.emailPlaceholder")}
            className="block border-[1px] border-sidebar-ring w-full py-2 sm:py-3 px-3 mt-1 rounded-md focus:outline-0 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors text-sm sm:text-base"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-gray-600 font-bold text-sm sm:text-base" htmlFor="message">{t("form.message")}</label>
          <textarea
            {...register("message")}
            rows={6}
            placeholder={t("form.messagePlaceholder")}
            className="block border-[1px] border-sidebar-ring w-full py-2 sm:py-3 px-3 mt-1 rounded-md focus:outline-0 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors resize-none text-sm sm:text-base flex-1"
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="bg-secondary rounded-lg text-white py-2 sm:py-3 cursor-pointer px-5 sm:px-6 font-semibold block hover:bg-secondary/90 transition-colors text-sm sm:text-base w-full sm:w-auto mt-auto disabled:opacity-70 disabled:cursor-not-allowed sm:ml-auto">
          {isSubmitting ? t("form.submitting") : t("form.submit")}
        </button>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-300">
            <div className="text-center">
              {/* Success Icon */}
              <Icon icon="mdi:check-circle" className="text-green-600 mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4" />

              {/* Success Message */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {t("success.title")}
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                {successMessage}
              </p>

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {t("success.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
