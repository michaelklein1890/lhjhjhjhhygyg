import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Quote {
  text: string;
  author: string;
}

const defaultQuotes: Quote[] = [
  {
    text: "النجاح هو القدرة على الانتقال من فشل إلى فشل دون فقدان الحماس",
    author: "ونستون تشرشل",
  },
  {
    text: "الطريقة الوحيدة للقيام بعمل عظيم هي أن تحب ما تفعله",
    author: "ستيف جوبز",
  },
  {
    text: "لا تقاس قيمة الإنسان بما يملكه، بل بما يعطيه",
    author: "ألبرت أينشتاين",
  },
  {
    text: "الفرص لا تأتي غالبًا، لذا عندما تظهر، التقطها",
    author: "كوكو شانيل",
  },
  {
    text: "أفضل طريقة للتنبؤ بالمستقبل هي أن تخلقه",
    author: "أبراهام لينكولن",
  },
  {
    text: "لا تخف من التغيير، بل خف من عدم التغيير",
    author: "الدالاي لاما",
  },
  {
    text: "الحياة إما مغامرة جريئة أو لا شيء",
    author: "هيلين كيلر",
  },
];

export function QuoteDisplay() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to get a random quote from our default list
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * defaultQuotes.length);
      return defaultQuotes[randomIndex];
    };

    // Try to get a quote from localStorage first
    const savedQuote = localStorage.getItem("daily_quote");
    const savedDate = localStorage.getItem("quote_date");
    const today = new Date().toDateString();

    if (savedQuote && savedDate === today) {
      // If we have a quote saved for today, use it
      setQuote(JSON.parse(savedQuote));
    } else {
      // Otherwise get a new quote
      const newQuote = getRandomQuote();
      setQuote(newQuote);

      // Save to localStorage
      localStorage.setItem("daily_quote", JSON.stringify(newQuote));
      localStorage.setItem("quote_date", today);
    }

    setLoading(false);
  }, []);

  if (loading || !quote) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm shadow-md border-0 overflow-hidden">
        <CardContent className="p-4 text-center">
          <p className="text-gray-500">جاري تحميل الاقتباس اليومي...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-md border-0 overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
          اقتباس اليوم
        </Badge>
        <blockquote className="text-xl font-medium text-gray-800 mb-3 leading-relaxed">
          "{quote.text}"
        </blockquote>
        <footer className="text-right text-gray-600">— {quote.author}</footer>
      </CardContent>
    </Card>
  );
}
