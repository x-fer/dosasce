"use client";

import {
  useState,
  useEffect,
  useRef,
  type ReactNode,
  createContext,
  useContext,
} from "react";

import { Trophy, Code, LogIn, User, Menu, X } from "lucide-react";
import Separator from "@/components/ui/separator";
import { useAuthClient } from "@/features/auth/useAuthClient";
import { Anchor } from "./anchor";
import Button from "./button";

type LinkItem = {
  id: string | number;
  title: string;
  href: string;
};

type HeaderDropdownProps = {
  problems: LinkItem[];
  leaderboards: LinkItem[];
};

const DropdownContext = createContext<{ close: () => void } | null>(null);

type DropdownProps = {
  trigger: (isOpen: boolean) => ReactNode;
  children: ReactNode;
  className?: string;
  onOpenChange?: (open: boolean) => void;
  triggerClassName?: string;
};

export default function Dropdown({
  trigger,
  children,
  className = "",
  onOpenChange,
  triggerClassName = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  const close = () => handleToggle(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleToggle(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => handleToggle(!isOpen)}
        className={`flex items-center gap-1.5 font-sans text-base transition-all duration-200 hover:opacity-80 ${triggerClassName}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger(isOpen)}
      </button>
      <div
        className={`absolute top-full right-0 z-50 mt-2 ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        } transition-all duration-200 ease-out`}
        role="menu"
      >
        <div className="bg-dosasce-white border-dosasce-red min-w-[180px] overflow-hidden rounded-2xl border-2 py-1.5 shadow-2xl backdrop-blur-sm">
          <DropdownContext.Provider value={{ close }}>
            {children}
          </DropdownContext.Provider>
        </div>
      </div>
    </div>
  );
}

type DropdownItemProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
};

export function DropdownItem({
  children,
  onClick,
  href,
  className = "",
}: DropdownItemProps) {
  const dropdownContext = useContext(DropdownContext);
  const baseClassName =
    "block w-full text-left px-4 py-2.5 text-sm font-sans text-dosasce-black transition-all duration-150 hover:bg-dosasce-light-red hover:text-dosasce-red active:bg-dosasce-light-red/80";

  const handleClick = () => {
    onClick?.();
    dropdownContext?.close();
  };

  if (href) {
    return (
      <Anchor
        href={href}
        styled={false}
        className={`${baseClassName} ${className}`}
        onClick={handleClick}
        role="menuitem"
      >
        {children}
      </Anchor>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`${baseClassName} ${className}`}
      role="menuitem"
    >
      {children}
    </button>
  );
}

export function DropdownTrigger({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-dosasce-white/10 flex items-center justify-center rounded-lg p-2 transition-colors"
      aria-label="Toggle menu"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}

export function HeaderDropdown({
  problems,
  leaderboards,
}: HeaderDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isLoading, login, logout } = useAuthClient();

  const close = () => setDropdownOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Don't close if clicking on the hamburger button or inside the dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !target.closest('button[aria-label="Toggle menu"]')
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen]);

  return (
    <>
      <DropdownTrigger
        isOpen={dropdownOpen}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      />

      {/* Dropdown Menu */}
      <div
        ref={dropdownRef}
        className={`bg-dosasce-white fixed top-[60px] right-0 left-0 z-40 max-h-[calc(100vh-60px)] overflow-y-auto shadow-2xl transition-all duration-300 ease-out ${
          dropdownOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="space-y-2 px-4 py-2 md:space-y-3 md:px-6 md:py-3">
          {/* Zadaci Section */}
          <div>
            <div className="mb-1.5 flex items-center gap-2 px-2">
              <Code size={18} className="text-dosasce-red mt-1 md:h-5 md:w-5" />
              <h3 className="text-dosasce-red font-serif text-base font-bold md:text-lg">
                Zadaci
              </h3>
            </div>
            <div className="space-y-0.5">
              {problems.map((task) => (
                <Anchor
                  key={task.id}
                  href={task.href}
                  onClick={close}
                  styled={false}
                  className="text-dosasce-black hover:bg-dosasce-light-red hover:text-dosasce-red block rounded-lg py-1 pr-3 pl-6 font-sans text-xs transition-all duration-150 md:py-1.5 md:pr-4 md:pl-8 md:text-sm"
                >
                  {task.title}
                </Anchor>
              ))}
            </div>
          </div>

          {/* Rang-lista Section */}
          <div>
            <div className="mb-1.5 flex items-center gap-2 px-2">
              <Trophy
                size={16}
                className="text-dosasce-red mt-0.5 md:h-5 md:w-5"
              />
              <h3 className="text-dosasce-red font-serif text-base font-bold md:text-lg">
                Rang lista
              </h3>
            </div>
            <div className="space-y-0.5">
              {leaderboards.map((leaderboard) => (
                <Anchor
                  key={leaderboard.id}
                  href={leaderboard.href}
                  onClick={close}
                  styled={false}
                  className="text-dosasce-black hover:bg-dosasce-light-red hover:text-dosasce-red block rounded-lg py-1 pr-3 pl-6 font-sans text-xs transition-all duration-150 md:py-1.5 md:pr-4 md:pl-8 md:text-sm"
                >
                  {leaderboard.title}
                </Anchor>
              ))}
            </div>
          </div>

          {/* Arhiva Section */}
          <div className="border-dosasce-light-red border-t-2 pt-2 md:pt-3">
            <Anchor
              href="/arhiva"
              onClick={close}
              styled={false}
              className="text-dosasce-black hover:bg-dosasce-light-red hover:text-dosasce-red flex items-center gap-2 rounded-lg px-3 py-1 font-sans text-xs transition-all duration-150 md:px-4 md:py-1.5 md:text-sm"
            >
              <span className="font-semibold">Arhiva</span>
              <span className="text-dosasce-black/60">Prethodne godine</span>
            </Anchor>
          </div>

          {/* Login/User Section */}
          {!isLoading && (
            <div className="border-dosasce-light-red border-t-2 pt-2 md:pt-3">
              {!user ? (
                <button
                  onClick={() => {
                    login();
                    close();
                  }}
                  className="border-dosasce-red text-dosasce-red hover:bg-dosasce-light-red flex w-full items-center justify-center gap-2 rounded-full border-2 px-3 py-1.5 font-sans text-xs transition-colors md:px-4 md:py-2 md:text-sm"
                >
                  <LogIn size={16} className="md:h-[18px] md:w-[18px]" />
                  <span>Prijavi se</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 space-y-1 md:space-y-1.5">
                  <div className="flex items-center gap-2 px-3 py-1 md:gap-3 md:px-4 md:py-1.5">
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata?.full_name || "User"}
                        className="h-7 w-7 rounded-full md:h-8 md:w-8"
                      />
                    ) : (
                      <User
                        size={16}
                        className="text-dosasce-red md:h-[18px] md:w-[18px]"
                      />
                    )}
                    <span className="text-dosasce-black font-sans text-xs md:text-sm">
                      {user.user_metadata?.full_name || "Korisnik"}
                    </span>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      logout();
                      close();
                    }}
                    className="text-dosasce-black hover:bg-dosasce-light-red hover:text-dosasce-red flex-1 rounded-lg px-3 py-1 text-center font-sans text-xs transition-all duration-150 md:px-4 md:py-1.5 md:text-sm"
                  >
                    Odjavi se
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <Separator variant="candy-cane" />
      </div>
    </>
  );
}
