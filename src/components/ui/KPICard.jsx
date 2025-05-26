import { TrendingUp, TrendingDown, BarChart3, Target, User, Factory, Zap, Truck } from "lucide-react"

const KPICard = ({ title, value, change, changeText, changeValue, isPositive, icon, color }) => {
  const getIcon = () => {
    switch (icon) {
      case "chart":
        return <BarChart3 size={30} />
      case "target":
        return <Target size={30} />
      case "user":
        return <User size={30} />
      case "trending":
        return isPositive ? <TrendingUp size={30} /> : <TrendingDown size={30} />
      case "factory":
        return <Factory size={30} />
      case "zap":
        return <Zap size={30} />
      case "truck":
        return <Truck size={30} />
      default:
        return <BarChart3 size={30} />
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div
          className="w-15 h-15 rounded-full flex items-center justify-center border-[2px]"
          style={{  color: color , borderColor: color}}
        >
          {getIcon()}
        </div>
      </div>

      {(change !== undefined || changeText) && (
        <div className="mt-4 flex items-center">
          <div className={`flex items-center text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="ml-1">{changeText}</span>
          </div>
        </div>
      )}

      {changeValue && (
        <div className={`mt-1 text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>{changeValue}</div>
      )}
    </div>
  )
}

export default KPICard