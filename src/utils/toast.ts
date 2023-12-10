import { toast as useToast } from "@/components/ui/use-toast";

interface ToastProps {
  title: string;
  description: string;
}

export const toast = ({ title, description }: ToastProps) => {
  useToast({
    title,
    description,
  });
};
