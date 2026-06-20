

export default function FloatingCard({
  icon: Icon,
  bgColor = "bg-white/10",
  iconColor = "text-white",
  textColor = "text-white",
  contentColor = "text-gray-300",
  title,
  content,
  className = "",
}) {
  return (
    <div className={`backdrop-blur-xl rounded-lg p-4 border border-white/50 shadow-2xl ${bgColor} ${className}`}>
      <div className="flex items-center space-x-2 mb-2">
        {Icon && (
          <div className={`w-6 h-6 flex items-center justify-center ${iconColor}`}>
            <Icon size={16} />
          </div>
        )}
        <span className={`text-sm font-medium ${textColor}`}>{title}</span>
      </div>
      <div className={`text-sm text-left ${contentColor}`}>{content}</div>
    </div>
  );
}