// Helper function to check if a value is within range
export const getStatusColor = (value: number, min: number, max: number) => {
    if (value < min) return "text-yellow-500"
    if (value > max) return "text-red-500"
    return "text-green-500"
  }

  // Format date
  export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
