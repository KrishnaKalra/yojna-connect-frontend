
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, DollarSign, FileText, ExternalLink, CheckCircle, AlertCircle, XCircle } from "lucide-react";

export const SchemeCard = ({ scheme }) => {
    let status = "inactive";
    if(scheme.is_active){
        status = "active";
    }
  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
    //   case "partially_eligible":
    //     return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    //   case "review_required":
    //     return <AlertCircle className="h-4 w-4 text-blue-600" />;
    //   case "not_eligible":
    //     return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
    //   case "partially_eligible":
    //     return "bg-yellow-100 text-yellow-800 border-yellow-200";
    //   case "review_required":
    //     return "bg-blue-100 text-blue-800 border-blue-200";
    //   case "not_eligible":
    //     return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
    //   case "partially_eligible":
    //     return "Partially Eligible";
    //   case "review_required":
    //     return "Review Required";
    //   case "not_eligible":
    //     return "Not Eligible";
      default:
        return "Inactive";
    }
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-500">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="text-xs">
            {scheme.sector}
          </Badge>
          <div className="flex items-center space-x-1">
            {getStatusIcon(status)}
            <Badge className={`text-xs ${getStatusColor(status)}`}>
              {getStatusText(status)}
            </Badge>
          </div>
        </div>
        
        <CardTitle className="text-lg line-clamp-2">{scheme.scheme_name}</CardTitle>
        {/* <CardDescription className="line-clamp-2">{scheme.description}</CardDescription> */}
        
        {/* Match Percentage */}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Profile Match</span>
            <span className={`text-sm font-semibold ${getMatchColor(scheme.match_score * 100)}`}>
              {scheme.match_score * 100}%
            </span>
          </div>
          <Progress value={scheme.match_score * 100} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Key Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {/* <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">{scheme.amount}</span>
            </div> */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-gray-600">Launch Date:</span>
              <span className="font-medium">{scheme.launch_date}</span>
            </div>
          </div>

          {/* Eligibility */}
          <div className="text-sm">
            <span className="text-gray-600">Scheme Type: </span>
            <span className="font-medium">{scheme.scheme_type}</span>
          </div>

          {/* Required Documents */}
          {/* <div className="text-sm">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="h-4 w-4 text-gray-600" />
              <span className="text-gray-600 font-medium">Required Documents:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {scheme.documents.slice(0, 2).map((doc, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {doc}
                </Badge>
              ))}
              {scheme.documents.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{scheme.documents.length - 2} more
                </Badge>
              )}
            </div>
          </div> */}

                  <div className="flex space-x-2 pt-2">
                    <Button 
                      className="flex-1" 
                      size="sm"
                      asChild
                      disabled={scheme.status === "not_eligible"}
                      onClick={e => e.stopPropagation()}
                    >
                      <a href={scheme.website} target="_blank" rel="noopener noreferrer">
                        Apply Now
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm">
                      <a href={`/scheme-details/${scheme.scheme_id}`} target="_blank" rel="noopener noreferrer">
                        Details
                      </a>
                    </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
