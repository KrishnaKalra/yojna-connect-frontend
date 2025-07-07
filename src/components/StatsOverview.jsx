
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Clock, FileText } from "lucide-react";

export const StatsOverview = ({ schemes }) => {
const stats = {
    active: schemes.filter(s => s.is_active).length,
    inactive: schemes.filter(s => !s.is_active).length,
    totalSchemes: schemes.length
};

//   const avgMatch = Math.round(
//     schemes.reduce((acc, scheme) => acc + scheme.matchPercentage, 0) / schemes.length
//   );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-center mb-1">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-700">{stats.active}</div>
              <div className="text-xs text-green-600">Active</div>
            </div>

            <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-center mb-1">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-yellow-700">{stats.inactive}</div>
              <div className="text-xs text-yellow-600">Inactive</div>
            </div>

            {/* <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center mb-1">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-700">{stats.reviewRequired}</div>
              <div className="text-xs text-blue-600">Review</div>
            </div> */}

            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center mb-1">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <div className="text-2xl font-bold text-gray-700">{stats.totalSchemes}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
          </div>

          {/* <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
            <div className="text-sm text-gray-600 mb-1">Average Match</div>
            <div className="text-2xl font-bold text-blue-700">{avgMatch}%</div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};
