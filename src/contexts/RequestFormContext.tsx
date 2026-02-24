"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { sendAdminNotification, sendClientConfirmation } from "../lib/emailjs";
import { RequestFormModal } from "../components/RequestFormModal";

type RequestFormContextValue = {
  openRequestForm: () => void;
};

const RequestFormContext = createContext<RequestFormContextValue | null>(null);

export function RequestFormProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openRequestForm = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <RequestFormContext.Provider value={{ openRequestForm }}>
      {children}
      {open && (
        <RequestFormModal
          onClose={close}
          onSubmit={async (data) => {
            const { error } = await supabase.from("owl_ai_demo_requests").insert({
              name: data.name,
              email: data.email,
              company: data.company,
              title: data.title || null,
              phone: data.phone || null,
              problems: data.problems || null,
            });
            if (error) throw error;
            const emailData = {
              name: data.name,
              email: data.email,
              telephone: data.phone || "",
              company: data.company || "",
              title: data.title || "",
              problems: data.problems || "",
            };
            Promise.all([
              sendAdminNotification(emailData),
              sendClientConfirmation(emailData),
            ]).catch(() => {});
          }}
        />
      )}
    </RequestFormContext.Provider>
  );
}

export function useRequestForm(): RequestFormContextValue {
  const ctx = useContext(RequestFormContext);
  if (!ctx) return { openRequestForm: () => window.location.assign("/demo") };
  return ctx;
}
