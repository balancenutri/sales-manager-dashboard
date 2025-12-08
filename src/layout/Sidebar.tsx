import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { dbUrls, menuItems } from "@/lib/data";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
        <div className="p-4 pb-5 flex items-center justify-between border-b border-gray-200">
          {isOpen && (
            <span className="text-sm font-semibold text-gray-900">
              Balance Nutrition
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="h-8 w-8"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link key={item.path} to={item.path} className="block">
                <Button
                  variant={active ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    active
                      ? "bg-teal-500 text-white hover:bg-teal-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && <span className="ml-3">{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-4 space-y-2">
          {dbUrls.map((db) => (
            <a
              key={db.url}
              href={db.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="ghost"
                className="w-full justify-between text-gray-700 hover:bg-gray-100 h-8"
              >
                {isOpen && <span className="text-sm truncate">{db.name}</span>}
                <ExternalLink className="h-4 w-4 flex-shrink-0" />
              </Button>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
