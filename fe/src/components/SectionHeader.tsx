import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onAction?: () => void;
}

export const SectionHeader = ({ title, actionText, onAction }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {actionText && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onAction}
          className="text-[#B967FF] hover:text-[#B967FF]/80"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};