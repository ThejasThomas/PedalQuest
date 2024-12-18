// src/components/ui/tabs.jsx
import React, { useState } from "react";

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className="tabs-container">
      {React.Children.map(children, child => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (child.type === TabsContent) {
          return React.cloneElement(child, { activeTab });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, { isActive: activeTab === index, onClick: () => setActiveTab(index) });
      })}
    </div>
  );
};

export const TabsTrigger = ({ children, isActive, onClick }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium ${isActive ? "border-b-2 border-primary" : "text-muted"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, activeTab, value }) => {
  if (activeTab !== value) return null;
  return <div className="mt-4">{children}</div>;
};
