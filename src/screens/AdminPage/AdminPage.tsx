"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import { getAdminSession, login as doLogin, logout as doLogout } from "../../lib/adminAuth";

export type SubmissionRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  title: string | null;
  phone: string | null;
  problems: string | null;
};

const TABLE_NAME = "owl_ai_demo_requests";

export const AdminPage = (): JSX.Element => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<SubmissionRow>>({});
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setAuthenticated(getAdminSession());
  }, []);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: e } = await supabase
      .from(TABLE_NAME)
      .select("id, created_at, name, email, company, title, phone, problems")
      .order("created_at", { ascending: false });
    if (e) {
      setError(e.message);
      setSubmissions([]);
    } else {
      setSubmissions((data as SubmissionRow[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authenticated) fetchSubmissions();
  }, [authenticated, fetchSubmissions]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (doLogin(password)) {
      setAuthenticated(true);
      setPassword("");
    } else {
      setLoginError("Invalid password");
    }
  };

  const handleLogout = () => {
    doLogout();
    setAuthenticated(false);
  };

  const startEdit = (row: SubmissionRow) => {
    setEditingId(row.id);
    setEditForm({
      name: row.name,
      email: row.email,
      company: row.company,
      title: row.title ?? "",
      phone: row.phone ?? "",
      problems: row.problems ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const { error: e } = await supabase
      .from(TABLE_NAME)
      .update({
        name: editForm.name ?? "",
        email: editForm.email ?? "",
        company: editForm.company ?? "",
        title: editForm.title || null,
        phone: editForm.phone || null,
        problems: editForm.problems || null,
      })
      .eq("id", editingId);
    if (e) {
      setError(e.message);
      return;
    }
    setEditingId(null);
    setEditForm({});
    fetchSubmissions();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this submission?")) return;
    setDeletingId(id);
    const { error: e } = await supabase.from(TABLE_NAME).delete().eq("id", id);
    setDeletingId(null);
    if (e) setError(e.message);
    else fetchSubmissions();
  };

  const formatDate = (s: string) => {
    try {
      return new Date(s).toLocaleString(undefined, {
        dateStyle: "short",
        timeStyle: "short",
      });
    } catch {
      return s;
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-sm rounded-xl border border-[#afafaf80] bg-white shadow-lg p-6 md:p-8">
          <h1 className="[font-family:'Manrope',Helvetica] font-bold text-black text-xl md:text-2xl mb-4">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block [font-family:'Manrope',Helvetica] text-sm font-semibold text-black mb-1"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-gray-300 [font-family:'Manrope',Helvetica] text-black focus:outline-none focus:ring-2 focus:ring-[#246193]"
                placeholder="Password"
                autoFocus
              />
            </div>
            {loginError && (
              <p className="[font-family:'Manrope',Helvetica] text-sm text-red-600 font-medium">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-[#246193] text-white [font-family:'Manrope',Helvetica] font-semibold text-sm md:text-base hover:bg-[#1a4a6b] transition-colors touch-manipulation"
            >
              Log in
            </button>
          </form>
        </div>
        <a
          href="/"
          className="mt-4 [font-family:'Manrope',Helvetica] text-sm font-semibold text-wezomcomdove-gray hover:text-[#246193] transition-colors"
        >
          ← Back to site
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#afafaf60] px-4 md:px-6 py-3 md:py-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="[font-family:'Manrope',Helvetica] font-bold text-black text-lg md:text-xl">
          Submissions
        </h1>
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="[font-family:'Manrope',Helvetica] text-sm font-semibold text-wezomcomdove-gray hover:text-[#246193] transition-colors touch-manipulation px-3 py-2"
          >
            Site
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="[font-family:'Manrope',Helvetica] text-sm font-semibold text-white bg-wezomcomblack hover:bg-black px-3 py-2 rounded-lg transition-colors touch-manipulation"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-6xl mx-auto">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 [font-family:'Manrope',Helvetica] text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="[font-family:'Manrope',Helvetica] text-wezomcomdove-gray text-sm">
            Loading…
          </p>
        ) : submissions.length === 0 ? (
          <p className="[font-family:'Manrope',Helvetica] text-wezomcomdove-gray text-sm">
            No submissions yet.
          </p>
        ) : (
          <>
            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-[#afafaf80]">
              <table className="w-full [font-family:'Manrope',Helvetica] text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-[#afafaf80]">
                    <th className="text-left p-3 font-semibold text-black">Date</th>
                    <th className="text-left p-3 font-semibold text-black">Name</th>
                    <th className="text-left p-3 font-semibold text-black">Email</th>
                    <th className="text-left p-3 font-semibold text-black">Company</th>
                    <th className="text-left p-3 font-semibold text-black">Title</th>
                    <th className="text-left p-3 font-semibold text-black w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-[#afafaf40] last:border-0 hover:bg-gray-50/50"
                    >
                      <td className="p-3 text-wezomcomblack">{formatDate(row.created_at)}</td>
                      <td className="p-3 text-black">{row.name}</td>
                      <td className="p-3 text-black">{row.email}</td>
                      <td className="p-3 text-black">{row.company}</td>
                      <td className="p-3 text-wezomcomdove-gray">{row.title ?? "—"}</td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => startEdit(row)}
                            className="px-2 py-1.5 rounded-lg bg-[#246193] text-white font-semibold text-xs hover:bg-[#1a4a6b] touch-manipulation"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(row.id)}
                            disabled={deletingId === row.id}
                            className="px-2 py-1.5 rounded-lg bg-red-600 text-white font-semibold text-xs hover:bg-red-700 disabled:opacity-50 touch-manipulation"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: cards */}
            <div className="md:hidden space-y-3">
              {submissions.map((row) => (
                <div
                  key={row.id}
                  className="rounded-xl border border-[#afafaf80] p-4 bg-white shadow-sm [font-family:'Manrope',Helvetica] text-sm"
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-wezomcomdove-gray text-xs">{formatDate(row.created_at)}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(row)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#246193] text-white font-semibold text-xs touch-manipulation"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(row.id)}
                        disabled={deletingId === row.id}
                        className="px-2.5 py-1.5 rounded-lg bg-red-600 text-white font-semibold text-xs touch-manipulation disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="font-semibold text-black">{row.name}</p>
                  <p className="text-wezomcomblack">{row.email}</p>
                  <p className="text-wezomcomblack">{row.company}</p>
                  {row.title && (
                    <p className="text-wezomcomdove-gray mt-1">{row.title}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Edit modal */}
      {editingId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 [font-family:'Manrope',Helvetica]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-modal-title"
        >
          <div className="bg-white rounded-xl border border-[#afafaf80] shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-4 md:p-6">
            <h2 id="edit-modal-title" className="font-bold text-black text-lg mb-4">
              Edit submission
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Name</label>
                <input
                  value={editForm.name ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#246193]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#246193]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Company</label>
                <input
                  value={editForm.company ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, company: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#246193]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Title</label>
                <input
                  value={editForm.title ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#246193]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Phone</label>
                <input
                  value={editForm.phone ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#246193]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black mb-1">Problems</label>
                <textarea
                  value={editForm.problems ?? ""}
                  onChange={(e) => setEditForm((f) => ({ ...f, problems: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#246193] resize-none"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={saveEdit}
                className="flex-1 h-10 rounded-lg bg-[#246193] text-white font-semibold text-sm hover:bg-[#1a4a6b] touch-manipulation"
              >
                Save
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="flex-1 h-10 rounded-lg border border-gray-300 text-black font-semibold text-sm hover:bg-gray-50 touch-manipulation"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
