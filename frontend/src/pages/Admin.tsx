import React, { useState, useEffect } from "react";
import { PortfolioData, PortfolioTable } from "../types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  login,
  register,
  getStoredUser,
  clearAuthSession,
  addItem,
  deleteItem,
  uploadFile,
  updateResume,
  getImageUrl,
} from "../lib/api";
import { toast } from "sonner";
import { Trash2, Upload, CheckCircle2, FileText, FileUp, ExternalLink, Download } from "lucide-react";

interface AdminProps {
  data: PortfolioData;
  onRefresh: () => void;
  onNavigateHome: () => void;
}

interface TableConfig {
  title: string;
  fields: {
    key: string;
    label: string;
    type?: "textarea" | "number" | "list" | "text" | "file";
  }[];
  display: (item: any) => string;
}

const tableConfigs: Record<PortfolioTable, TableConfig> = {
  projects: {
    title: "Projects",
    fields: [
      { key: "title", label: "Title" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "tech", label: "Tech (comma separated)", type: "list" },
      { key: "live_url", label: "Live link" },
      { key: "repo_url", label: "GitHub link" },
      { key: "image_url", label: "Project Image (Upload or URL)" },
    ],
    display: (item) => String(item.title),
  },
  skills: {
    title: "Skills",
    fields: [
      { key: "name", label: "Skill" },
      { key: "category", label: "Category" },
      { key: "level", label: "Level 0-100", type: "number" },
    ],
    display: (item) => `${item.name} · LV ${item.level}`,
  },
  certifications: {
    title: "Certifications",
    fields: [
      { key: "title", label: "Title" },
      { key: "issuer", label: "Issuer" },
      { key: "issued_on", label: "Date (e.g. Mar 2026)" },
      { key: "credential_url", label: "Credential link" },
      { key: "image_url", label: "Certificate Image / Document (Upload or URL)" },
    ],
    display: (item) => `${item.title} — ${item.issuer}`,
  },
  interests: {
    title: "Interests",
    fields: [
      { key: "name", label: "Interest" },
      { key: "emoji", label: "Emoji" },
    ],
    display: (item) => `${item.emoji} ${item.name}`,
  },
};

export const Admin: React.FC<AdminProps> = ({
  data,
  onRefresh,
  onNavigateHome,
}) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [authMode, setAuthMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<PortfolioTable | "resume">("projects");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrlInput, setResumeUrlInput] = useState("");
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setCurrentUser(user);
    }
    setIsReady(true);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      if (authMode === "in") {
        const res = await login(email, password);
        setCurrentUser(res.user);
        toast.success("Welcome back, Commander!");
      } else {
        const res = await register(email, password);
        setCurrentUser(res.user);
        toast.success("Player created! Admin privileges granted.");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = () => {
    clearAuthSession();
    setCurrentUser(null);
    toast.info("Logged out.");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadFile(file);
      setFormData((prev) => ({ ...prev, [key]: res.url }));
      toast.success(`Uploaded: ${file.name}`);
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleResumeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile && !resumeUrlInput.trim()) {
      toast.error("Please select a PDF file or enter a resume URL");
      return;
    }

    setUploadingResume(true);
    try {
      await updateResume(resumeFile || resumeUrlInput.trim());
      toast.success("Resume updated successfully!");
      setResumeFile(null);
      setResumeUrlInput("");
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to update resume");
    } finally {
      setUploadingResume(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "resume") return;
    const config = tableConfigs[activeTab];
    const items = data[activeTab] || [];
    const payload: any = {
      sort_order: items.length + 1,
    };

    for (const f of config.fields) {
      const val = (formData[f.key] ?? "").trim();
      if (f.type === "number") {
        payload[f.key] = Math.max(0, Math.min(100, Number(val) || 0));
      } else if (f.type === "list") {
        payload[f.key] = val
          ? val.split(",").map((s) => s.trim()).filter(Boolean)
          : [];
      } else if (val) {
        payload[f.key] = val;
      }
    }

    try {
      await addItem(activeTab, payload);
      toast.success("Added successfully!");
      setFormData({});
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to add item");
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (activeTab === "resume") return;
    try {
      await deleteItem(activeTab, id);
      toast.success("Deleted!");
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  if (!isReady) return null;

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="comic-title text-5xl text-primary">CONTROL ROOM</h1>
        <div className="flex gap-3">
          <Button
            variant="comicBlue"
            size="sm"
            onClick={onNavigateHome}
          >
            View site
          </Button>
          {currentUser && (
            <Button
              variant="comicYellow"
              size="sm"
              onClick={handleSignOut}
            >
              Log out
            </Button>
          )}
        </div>
      </div>

      {!currentUser ? (
        <form
          onSubmit={handleAuth}
          className="comic-panel mx-auto max-w-sm space-y-4 p-6"
        >
          <p className="font-pixel text-[10px] text-accent">
            {authMode === "in" ? "INSERT COIN TO CONTINUE" : "CREATE PLAYER"}
          </p>
          <Input
            type="email"
            placeholder="Email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            minLength={6}
            autoComplete={authMode === "in" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="comic"
            className="w-full"
            disabled={authLoading}
          >
            {authMode === "in" ? "Log in" : "Sign up"}
          </Button>
          <button
            type="button"
            className="w-full text-xs text-muted-foreground hover:text-accent transition-colors"
            onClick={() => setAuthMode(authMode === "in" ? "up" : "in")}
          >
            {authMode === "in"
              ? "First time? Create the admin account"
              : "Have an account? Log in"}
          </button>
          <p className="text-[11px] text-muted-foreground">
            The very first account created becomes the only admin.
          </p>
        </form>
      ) : (
        <div>
          <div className="mb-6 flex flex-wrap gap-2">
            {(Object.keys(tableConfigs) as PortfolioTable[]).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "comic" : "comicBlue"}
                size="sm"
                onClick={() => {
                  setActiveTab(tab);
                  setFormData({});
                }}
              >
                {tableConfigs[tab].title}
              </Button>
            ))}
            <Button
              variant={activeTab === "resume" ? "comic" : "comicYellow"}
              size="sm"
              onClick={() => {
                setActiveTab("resume");
              }}
            >
              📄 Resume
            </Button>
          </div>

          {activeTab === "resume" ? (
            <div className="comic-panel space-y-6 p-6">
              <div className="border-b-2 border-ink pb-4">
                <p className="font-pixel text-xs text-accent">RESUME CONTROL & UPLINK</p>
                <h2 className="font-comic text-2xl tracking-wide mt-1">Manage Public Resume</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload a new PDF resume or enter a document URL. All &quot;Download Resume&quot; buttons across the portfolio will automatically serve this version.
                </p>
              </div>

              {/* Current Active Resume Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-sm border-2 border-ink bg-muted/40 p-4">
                <div className="min-w-0 flex-1">
                  <span className="font-pixel text-[9px] text-accent uppercase">Currently Deployed Resume</span>
                  <div className="mt-1 flex items-center gap-2">
                    <FileText className="size-5 text-accent shrink-0" />
                    <span className="font-bold text-sm truncate">
                      {data.resume_url || "/resume.pdf"}
                    </span>
                    <span className="border border-ink bg-accent/20 px-2 py-0.5 font-pixel text-[8px] text-accent shrink-0">
                      {data.resume_url ? "CUSTOM ACTIVE" : "DEFAULT ACTIVE"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button asChild variant="comicBlue" size="sm">
                    <a
                      href={getImageUrl(data.resume_url || "/resume.pdf")}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="size-3.5" />
                      <span>Preview</span>
                    </a>
                  </Button>
                  <Button asChild variant="comicYellow" size="sm">
                    <a
                      href={getImageUrl(data.resume_url || "/resume.pdf")}
                      download="Aditya_Shah_Resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5"
                    >
                      <Download className="size-3.5" />
                      <span>Download</span>
                    </a>
                  </Button>
                </div>
              </div>

              {/* Upload Form */}
              <form onSubmit={handleResumeUpload} className="space-y-4">
                <p className="font-pixel text-[10px] text-accent">UPLOAD NEW RESUME (PDF)</p>

                {/* File Drop/Select Area */}
                <div className="relative border-2 border-dashed border-ink bg-background p-6 text-center hover:bg-muted/20 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setResumeFile(file);
                        setResumeUrlInput("");
                      }
                    }}
                  />
                  <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                    <FileUp className="size-8 text-accent animate-bounce" />
                    <span className="font-comic text-lg">
                      {resumeFile ? resumeFile.name : "Click or Drag & Drop a PDF Resume"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {resumeFile
                        ? `${(resumeFile.size / 1024).toFixed(1)} KB — Ready to upload`
                        : "Supports PDF documents up to 15MB"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="font-pixel text-[9px] text-muted-foreground">OR ENTER DIRECT URL</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <Input
                  type="url"
                  placeholder="https://drive.google.com/... or https://res.cloudinary.com/..."
                  value={resumeUrlInput}
                  onChange={(e) => {
                    setResumeUrlInput(e.target.value);
                    if (e.target.value) setResumeFile(null);
                  }}
                />

                <Button
                  type="submit"
                  variant="comic"
                  className="w-full"
                  disabled={uploadingResume || (!resumeFile && !resumeUrlInput.trim())}
                >
                  {uploadingResume ? "UPLOADING & DEPLOYING RESUME..." : "SAVE & DEPLOY RESUME"}
                </Button>
              </form>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              <form
                onSubmit={handleAddItem}
                className="comic-panel space-y-3 p-5"
              >
                <p className="font-pixel text-[10px] text-accent">
                  ADD {tableConfigs[activeTab as PortfolioTable].title.toUpperCase()}
                </p>
                {tableConfigs[activeTab as PortfolioTable].fields.map((field) => {
                  if (field.type === "textarea") {
                    return (
                      <Textarea
                        key={field.key}
                        placeholder={field.label}
                        value={formData[field.key] ?? ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.key]: e.target.value,
                          })
                        }
                      />
                    );
                  }

                  if (field.key === "image_url") {
                    return (
                      <div key={field.key} className="space-y-1.5">
                        <Input
                          type="text"
                          placeholder={field.label}
                          value={formData[field.key] ?? ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field.key]: e.target.value,
                            })
                          }
                        />
                        <div className="flex items-center justify-between text-xs px-1">
                          <label className="inline-flex items-center gap-1.5 cursor-pointer font-pixel text-[9px] text-accent hover:underline">
                            <Upload className="size-3.5" />
                            <span>UPLOAD FILE</span>
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              className="hidden"
                              disabled={uploading}
                              onChange={(e) => handleFileUpload(e, field.key)}
                            />
                          </label>
                          {uploading && (
                            <span className="font-pixel text-[8px] text-xp animate-pulse">
                              UPLOADING...
                            </span>
                          )}
                          {formData[field.key] && !uploading && (
                            <span className="inline-flex items-center gap-1 font-pixel text-[8px] text-xp">
                              <CheckCircle2 className="size-3" /> ATTACHED
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Input
                      key={field.key}
                      type={field.type === "number" ? "number" : "text"}
                      placeholder={field.label}
                      required={field === tableConfigs[activeTab as PortfolioTable].fields[0]}
                      value={formData[field.key] ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                    />
                  );
                })}
                <Button type="submit" variant="comic" className="w-full">
                  Add
                </Button>
              </form>

              <div className="space-y-3">
                {((data[activeTab as PortfolioTable] || []) as any[]).map((item: any) => (
                  <div
                    key={String(item.id)}
                    className="comic-panel flex items-center justify-between gap-3 p-3"
                  >
                    <span className="truncate">
                      {tableConfigs[activeTab as PortfolioTable].display(item)}
                    </span>
                    <Button
                      variant="comic"
                      size="icon"
                      aria-label="Delete"
                      onClick={() => handleDeleteItem(String(item.id))}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
                {((data[activeTab as PortfolioTable] || []) as any[]).length === 0 && (
                  <p className="text-muted-foreground">Nothing here yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};
