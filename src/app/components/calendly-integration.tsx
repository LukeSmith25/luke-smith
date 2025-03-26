"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { PopupModal, InlineWidget } from "react-calendly";

interface CalendlyIntegrationProps {
    url: string;
    buttonText?: string;
    className?: string;
    inline?: boolean;
    size?: "default" | "sm" | "lg" | "icon";
    prefill?: {
        email?: string;
        firstName?: string;
        lastName?: string;
        name?: string;
    };
}

export default function CalendlyIntegration({
    url,
    buttonText = "Schedule a Meeting",
    className = "",
    inline = false,
    size = "sm",
    prefill = {},
}: CalendlyIntegrationProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

    // Set the root element after the component mounts
    useEffect(() => {
        setRootElement(document.body);
    }, []);

    // For inline embedding on the page
    if (inline) {
        return (
            <div className={`w-full rounded-md border border-border ${className}`} style={{ height: "650px" }}>
                <InlineWidget 
                    url={url}
                    styles={{
                        height: '650px',
                        width: '100%',
                    }}
                    prefill={prefill}
                />
            </div>
        );
    }

    // For popup button
    const handleClick = () => {
        setIsLoading(true);
        setIsOpen(true);
    };

    return (
        <>
            <Button 
                onClick={handleClick} 
                className={className} 
                size={size}
                variant="outline"
                disabled={isLoading && !isOpen}
            >
                <Clock className="mr-2 h-4 w-4" />
                {isLoading && !isOpen ? "Loading..." : buttonText}
            </Button>
            
            {rootElement && (
                <PopupModal
                    url={url}
                    prefill={prefill}
                    onModalClose={() => {
                        setIsOpen(false);
                        setIsLoading(false);
                    }}
                    open={isOpen}
                    rootElement={rootElement}
                />
            )}
        </>
    );
}
