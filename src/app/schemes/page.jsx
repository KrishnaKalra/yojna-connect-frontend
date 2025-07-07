"use client";

import { useState } from "react";
import { Search, Filter, User, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchemeCard } from "@/components/SchemeCard";
import { FilterPanel } from "@/components/FilterPanel";
import { StatsOverview } from "@/components/StatsOverview";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data for schemes
  // const schemes = [
  //   {
  //     id: 1,
  //     title: "PM Kisan Samman Nidhi Yojana",
  //     description: "Direct income support of Rs 6000 per year to small and marginal farmers",
  //     category: "Agriculture",
  //     eligibility: "Small & Marginal Farmers",
  //     amount: "₹6,000/year",
  //     deadline: "2024-03-31",
  //     matchPercentage: 95,
  //     status: "eligible",
  //     applicationUrl: "#",
  //     documents: ["Aadhaar Card", "Bank Details", "Land Records"]
  //   },
  //   {
  //     id: 2,
  //     title: "Pradhan Mantri Awas Yojana",
  //     description: "Housing scheme for economically weaker sections and low income groups",
  //     category: "Housing",
  //     eligibility: "EWS/LIG families",
  //     amount: "₹2.5 Lakh subsidy",
  //     deadline: "2024-12-31",
  //     matchPercentage: 87,
  //     status: "eligible",
  //     applicationUrl: "#",
  //     documents: ["Income Certificate", "Aadhaar Card", "Property Documents"]
  //   },
  //   {
  //     id: 3,
  //     title: "Ayushman Bharat PM-JAY",
  //     description: "Health insurance scheme providing coverage up to Rs 5 lakh per family",
  //     category: "Healthcare",
  //     eligibility: "SECC 2011 beneficiaries",
  //     amount: "₹5 Lakh coverage",
  //     deadline: "Ongoing",
  //     matchPercentage: 72,
  //     status: "partially_eligible",
  //     applicationUrl: "#",
  //     documents: ["Aadhaar Card", "SECC Card", "Family Photo"]
  //   },
  //   {
  //     id: 4,
  //     title: "Mudra Loan Scheme",
  //     description: "Micro-finance scheme for small business enterprises",
  //     category: "Business",
  //     eligibility: "Small business owners",
  //     amount: "Up to ₹10 Lakh",
  //     deadline: "Ongoing",
  //     matchPercentage: 65,
  //     status: "review_required",
  //     applicationUrl: "#",
  //     documents: ["Business Plan", "Aadhaar Card", "Bank Statements"]
  //   },
  //   {
  //     id: 5,
  //     title: "Beti Bachao Beti Padhao",
  //     description: "Scheme to improve child sex ratio and enable education for girls",
  //     category: "Education",
  //     eligibility: "Girl child families",
  //     amount: "Various benefits",
  //     deadline: "Ongoing",
  //     matchPercentage: 58,
  //     status: "not_eligible",
  //     applicationUrl: "#",
  //     documents: ["Birth Certificate", "School Records", "Aadhaar Card"]
  //   },
  //   {
  //     id: 6,
  //     title: "PM Scholarship Scheme",
  //     description: "Scholarships for higher education of children of armed forces personnel",
  //     category: "Education",
  //     eligibility: "Children of armed forces",
  //     amount: "₹25,000/year",
  //     deadline: "2024-02-28",
  //     matchPercentage: 45,
  //     status: "not_eligible",
  //     applicationUrl: "#",
  //     documents: ["Service Certificate", "Academic Records", "Income Certificate"]
  //   }
  // ];

  const schemes = [
    {
        scheme_name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        sector: "Agriculture",
        scheme_type: "National (Central Sector Scheme)",
        launch_date: "2019-02-19",
        is_active: true,
        website: "https://pmkisan.gov.in/",
        match_score: 0.0
    }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.scheme_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || scheme.sector.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "Agriculture", "Housing", "Healthcare", "Business", "Education"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">YC</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Yojana Connect</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>RC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <StatsOverview schemes={schemes} />
              {/* {showFilters && <FilterPanel onCategoryChange={setSelectedCategory} />} */}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Search and Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search government schemes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:w-auto"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Category Tabs */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="text-xs sm:text-sm">
                      {category === "all" ? "All" : category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Schemes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSchemes.map((scheme) => (
                  <SchemeCard key={scheme.id} scheme={scheme} />
                ))}
              </div>

              {filteredSchemes.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="text-gray-500">
                      <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium mb-2">No schemes found</h3>
                      <p>Try adjusting your search terms or filters</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
