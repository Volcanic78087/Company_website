import React from "react";
import { Loader2 } from "lucide-react";

const Spinner = ({
  size = "md",
  color = "primary",
  className = "",
  showText = false,
  text = "Loading...",
  position = "center",
}) => {
  // Size configurations
  const sizeConfig = {
    xs: {
      spinner: "h-3 w-3",
      text: "text-xs",
      icon: 12,
    },
    sm: {
      spinner: "h-4 w-4",
      text: "text-sm",
      icon: 14,
    },
    md: {
      spinner: "h-6 w-6",
      text: "text-base",
      icon: 20,
    },
    lg: {
      spinner: "h-8 w-8",
      text: "text-lg",
      icon: 24,
    },
    xl: {
      spinner: "h-12 w-12",
      text: "text-xl",
      icon: 28,
    },
  };

  // Color configurations
  const colorConfig = {
    primary: "text-primary-600",
    secondary: "text-secondary-600",
    white: "text-white",
    gray: "text-gray-600",
    red: "text-red-600",
    green: "text-green-600",
    blue: "text-blue-600",
    yellow: "text-yellow-600",
    purple: "text-purple-600",
    pink: "text-pink-600",
  };

  // Position configurations
  const positionConfig = {
    center: "justify-center items-center",
    start: "justify-start items-center",
    end: "justify-end items-center",
    left: "justify-start items-center",
    right: "justify-end items-center",
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;
  const currentColor = colorConfig[color] || colorConfig.primary;
  const currentPosition = positionConfig[position] || positionConfig.center;

  // Simple spinner variant
  const SimpleSpinner = () => (
    <div
      className={`animate-spin ${currentSize.spinner} ${currentColor} ${className}`}
    >
      <Loader2 size={currentSize.icon} className="animate-spin" />
    </div>
  );

  // Circle spinner variant
  const CircleSpinner = () => (
    <div className={`${currentSize.spinner} ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 ${currentColor} border-t-transparent`}
      ></div>
    </div>
  );

  // Dots spinner variant
  const DotsSpinner = () => (
    <div className={`flex space-x-1 ${className}`}>
      <div
        className={`animate-bounce h-2 w-2 rounded-full ${currentColor}`}
      ></div>
      <div
        className={`animate-bounce h-2 w-2 rounded-full ${currentColor} animation-delay-150`}
      ></div>
      <div
        className={`animate-bounce h-2 w-2 rounded-full ${currentColor} animation-delay-300`}
      ></div>
    </div>
  );

  // With text
  if (showText) {
    return (
      <div className={`flex ${currentPosition} space-x-3 ${className}`}>
        <CircleSpinner />
        <span className={`${currentSize.text} ${currentColor} font-medium`}>
          {text}
        </span>
      </div>
    );
  }

  // Return circle spinner by default
  return <CircleSpinner />;
};

// Additional spinner components
export const PageSpinner = ({ message = "Loading page..." }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <Spinner size="xl" color="primary" />
    <p className="mt-4 text-gray-600 font-medium">{message}</p>
  </div>
);

export const ButtonSpinner = ({ size = "sm", color = "white" }) => (
  <Spinner size={size} color={color} />
);

export const InlineSpinner = ({ text = "Loading..." }) => (
  <Spinner
    size="sm"
    color="gray"
    showText={true}
    text={text}
    position="start"
  />
);

export const FullScreenSpinner = () => (
  <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center space-y-4">
      <Spinner size="xl" color="primary" />
      <p className="text-lg font-semibold text-gray-700">Please wait...</p>
      <p className="text-sm text-gray-500">We're preparing your content</p>
    </div>
  </div>
);

// Progress spinner (with percentage)
export const ProgressSpinner = ({
  percentage = 0,
  size = "lg",
  showPercentage = true,
}) => {
  const sizeMap = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
    xl: "h-40 w-40",
  };

  const strokeWidth = {
    sm: 4,
    md: 6,
    lg: 8,
    xl: 10,
  };

  const radius = {
    sm: 26,
    md: 40,
    lg: 54,
    xl: 68,
  };

  const currentSize = sizeMap[size] || sizeMap.lg;
  const currentRadius = radius[size] || radius.lg;
  const currentStroke = strokeWidth[size] || strokeWidth.lg;

  const circumference = 2 * Math.PI * currentRadius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className={`${currentSize} transform -rotate-90`}>
        {/* Background circle */}
        <circle
          cx="50%"
          cy="50%"
          r={currentRadius}
          stroke="currentColor"
          strokeWidth={currentStroke}
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx="50%"
          cy="50%"
          r={currentRadius}
          stroke="currentColor"
          strokeWidth={currentStroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary-600 transition-all duration-300"
        />
      </svg>

      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-900">{percentage}%</span>
        </div>
      )}
    </div>
  );
};

// Loading overlay
export const LoadingOverlay = ({
  isLoading,
  children,
  message = "Loading...",
}) => {
  if (!isLoading) return children;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" color="primary" />
          <p className="mt-3 text-gray-700 font-medium">{message}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

// Skeleton loader
export const SkeletonLoader = ({
  type = "card",
  count = 1,
  className = "",
}) => {
  const CardSkeleton = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-lg bg-gray-200"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );

  const LineSkeleton = () => (
    <div className="space-y-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  );

  const TableSkeleton = () => (
    <div className="space-y-3">
      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  );

  switch (type) {
    case "card":
      return (
        <div className={`space-y-4 ${className}`}>
          {[...Array(count)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      );
    case "line":
      return <LineSkeleton />;
    case "table":
      return <TableSkeleton />;
    default:
      return <CardSkeleton />;
  }
};

export default Spinner;
