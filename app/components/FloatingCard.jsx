

export default function FloatingCard({ currentFloatingCard }) {
  const Icon = currentFloatingCard.icon;
  return (
    <div
      className={`block absolute -bottom-8 right-2 transform translate-x-8 translate-y-8 w-72 ${currentFloatingCard.bgColor} backdrop-blur-xl rounded-lg p-4 border border-white/50 shadow-2xl animate-bounce `}
    >
      <div className="flex items-center space-x-2 mb-2">
        <div
          className={`w-6 h-6 ${currentFloatingCard.iconColor} flex items-center justify-center text-sm font-bold`}
        >
          {Icon ? <Icon size={16} /> : null}
        </div>
        <span
          className={`text-sm font-medium ${currentFloatingCard.textColor}`}
        >
          {currentFloatingCard.title}
        </span>
      </div>

      <div className={`text-sm text-left ${currentFloatingCard.contentColor}`}>
        {currentFloatingCard.content}
      </div>
    </div>
  );
}
