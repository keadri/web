import { FC } from 'react';
import { FaGraduationCap, FaBriefcase, FaFileAlt, FaPassport, FaComments, FaCheckSquare } from 'react-icons/fa';

interface ServiceIconProps {
  name: string;
  className?: string;
}

const ServiceIcon: FC<ServiceIconProps> = ({ name, className = '' }) => {
  const iconMap = {
    'graduation-cap': FaGraduationCap,
    'career': FaBriefcase,
    'document': FaFileAlt,
    'passport': FaPassport,
    'interview': FaComments,
    'document-check': FaCheckSquare,
  };

  const Icon = iconMap[name as keyof typeof iconMap] || FaFileAlt;
  return <Icon className={`text-white ${className}`} />;
};

export default ServiceIcon; 