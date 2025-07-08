
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export const FilterPanel = ({ onCategoryChange }) => {
  const categories = ["Agriculture", "Housing", "Healthcare", "Business", "Education", "Social Welfare"];
  const statusOptions = ["Eligible", "Partially Eligible", "Review Required"];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {/* Categories */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Categories</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={category} />
                <Label htmlFor={category} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Eligibility Status</Label>
          <div className="space-y-2">
            {statusOptions.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox id={status} />
                <Label htmlFor={status} className="text-sm">
                  {status}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Match Percentage */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Minimum Match Percentage
          </Label>
          <Slider
            defaultValue={[50]}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Amount Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Benefit Amount</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="low" />
              <Label htmlFor="low" className="text-sm">
                Up to ₹1 Lakh
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="medium" />
              <Label htmlFor="medium" className="text-sm">
                ₹1-5 Lakh
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="high" />
              <Label htmlFor="high" className="text-sm">
                Above ₹5 Lakh
              </Label>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button size="sm" className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
