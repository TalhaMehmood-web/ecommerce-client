import clsx from "clsx";

interface PageTitleProps {
  className?: string;
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, className }) => {
  return <p className={clsx(className, "text-4xl font-bold")}>{title}</p>;
};

export default PageTitle;
