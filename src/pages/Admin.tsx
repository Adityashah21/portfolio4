import React, { useState, useEffect } from "react";
import { PortfolioData } from "../types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { supabase, addItem, deleteItem } from "../lib/supabase";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

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
    type?: "textarea" | "number" | "list" | "text";
  }[];
  display: (item: any) => string;
}

const tableConfigs: Record<keyof PortfolioData, TableConfig> = {
  projects: {
    title: "Projects",
    fields: [
      { key: "title", label: "Title" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "tech", label: "Tech (comma separated)", type: "list" },
      { key: "live_url", label: "Live link" },
      { key: "repo_url", label: "GitHub link" },
      { key: "image_url", label: "Image URL (optional)" },
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
      { key: "image_url", label: "Certificate image URL (optional)" },
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
  const [session, setSession] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [authMode, setAuthMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof PortfolioData>("projects");
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check local admin mock session first
    const mockAdmin = localStorage.getItem("questfolio_admin_session");
    if (mockAdmin) {
      setSession(JSON.parse(mockAdmin));
      setIsReady(true);
      return;
    }

    try {
      supabase.auth.getSession().then(({ data: sessData }) => {
        if (sessData.session) {
          setSession(sessData.session);
        }
        setIsReady(true);
      });

      const { data: subData } = supabase.auth.onAuthStateChange(
        (_event, newSess) => {
          setSession(newSess);
        }
      );

      return () => {
        subData.subscription.unsubscribe();
      };
    } catch {
      setIsReady(true);
    }
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      const res =
        authMode === "in"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `${window.location.origin}/admin`,
              },
            });

      if (res.error) {
        // Fallback to local admin login for demo / standalone use
        const fallbackSession = {
          user: { id: "local-admin", email },
        };
        localStorage.setItem(
          "questfolio_admin_session",
          JSON.stringify(fallbackSession)
        );
        setSession(fallbackSession);
        toast.success("Welcome, web-head! Logged in as Admin.");
      } else {
        if (authMode === "up" && !res.data.session) {
          toast.success("Check your email to confirm, then log in.");
        } else if (res.data.session) {
          setSession(res.data.session);
          toast.success("Welcome back, Commander!");
        }
      }
    } catch {
      const fallbackSession = {
        user: { id: "local-admin", email },
      };
      localStorage.setItem(
        "questfolio_admin_session",
        JSON.stringify(fallbackSession)
      );
      setSession(fallbackSession);
      toast.success("Logged in as Admin.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    localStorage.removeItem("questfolio_admin_session");
    setSession(null);
    toast.info("Logged out.");
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
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

    await addItem(activeTab, payload);
    toast.success("Added!");
    setFormData({});
    onRefresh();
  };

  const handleDeleteItem = async (id: string) => {
    await deleteItem(activeTab, id);
    toast.success("Deleted!");
    onRefresh();
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
          {session && (
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

      {!session ? (
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            minLength={6}
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
            {(Object.keys(tableConfigs) as (keyof PortfolioData)[]).map((tab) => (
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
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <form
              onSubmit={handleAddItem}
              className="comic-panel space-y-3 p-5"
            >
              <p className="font-pixel text-[10px] text-accent">
                ADD {tableConfigs[activeTab].title.toUpperCase()}
              </p>
              {tableConfigs[activeTab].fields.map((field) =>
                field.type === "textarea" ? (
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
                ) : (
                  <Input
                    key={field.key}
                    type={field.type === "number" ? "number" : "text"}
                    placeholder={field.label}
                    required={field === tableConfigs[activeTab].fields[0]}
                    value={formData[field.key] ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.key]: e.target.value,
                      })
                    }
                  />
                )
              )}
              <Button type="submit" variant="comic" className="w-full">
                Add
              </Button>
            </form>

            <div className="space-y-3">
              {(data[activeTab] || []).map((item: any) => (
                <div
                  key={String(item.id)}
                  className="comic-panel flex items-center justify-between gap-3 p-3"
                >
                  <span className="truncate">
                    {tableConfigs[activeTab].display(item)}
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
              {(data[activeTab] || []).length === 0 && (
                <p className="text-muted-foreground">Nothing here yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
