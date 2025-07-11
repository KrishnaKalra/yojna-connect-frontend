"use client";

import { useState, useEffect } from "react";
import { Search, Filter, User, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchemeCard } from "@/components/sections/SchemeCard";
import { FilterPanel } from "@/components/sections/FilterPanel";
import { StatsOverview } from "@/components/sections/StatsOverview";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Spinner } from "@/components/ui/spinner";


const SchemesDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

 useEffect(() => {
    const fetchData = async () => {
      if (status === 'loading') {
        return;
      }

        try {
          setLoading(true);
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/scheme/show_all`, {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          });
          setSchemes(response.data);
        } catch (err) {
          console.error('Error fetching schemes:', err);
          if (err.response && err.response.status === 401) {
            console.log('Token expired or invalid, redirecting to login...');
            router.push('/login');
          }
        } finally {
          setLoading(false);
        }
    };
    fetchData();
  }, [status, session]);

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.scheme_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || scheme.sector.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "Agriculture", "Housing", "Healthcare", "Business", "Education"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(loading || status === 'loading') ? (
          <Spinner />
        ) : (
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
        )}
        
      </div>
    </div>
  );
};

export default SchemesDashboard;