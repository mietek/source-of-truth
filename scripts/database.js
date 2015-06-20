module.exports = [
  {
    "author": "David Turner",
    "title": "Elementary strong functional programming",
    "year": 1995,
    "abstract": "Functional programming is a good idea, but we haven’t got it quite right yet. What we have been doing up to now is weak (or partial) functional programming. What we should be doing is strong (or total) functional programming — in which all computations terminate. We propose an elementary discipline of strong functional programming. A key feature of the discipline is that we introduce a type distinction between _data_, which is known to be finite, and _codata_, which is (potentially) infinite.\n",
    "references": [
      {
        "authors": [
          "R.S. Bird",
          "Philip Wadler"
        ],
        "title": "Introduction to functional programming",
        "year": 1988
      },
      {
        "author": "K. Gödel",
        "title": "On a hitherto unutilized extension of the finitary standpoint",
        "year": 1958
      },
      {
        "authors": [
          "R. Harper",
          "D. MacQueen",
          "R. Milner"
        ],
        "title": "Standard ML",
        "year": 1986
      },
      {
        "authors": [
          "Paul Hudak",
          "et al."
        ],
        "title": "Report on the programming language Haskell",
        "year": 1992
      },
      {
        "author": "A.M. Pitts",
        "title": "A co-induction principle for recursively defined domains",
        "year": 1994
      },
      {
        "author": "Colin Runciman",
        "title": "What about the natural numbers",
        "year": 1989
      },
      {
        "author": "S.J. Thompson",
        "title": "A logic for Miranda",
        "year": 1989
      },
      {
        "author": "David Turner",
        "title": "Functional programming and proofs of program correctness",
        "year": 1982
      },
      {
        "author": "David Turner",
        "title": "Miranda: A non-strict functional language with polymorphic types",
        "year": 1985
      }
    ]
  },
  {
    "authors": [
      "Alastair Telford",
      "David Turner"
    ],
    "title": "Ensuring streams flow",
    "year": 1997,
    "abstract": "It is our aim to develop an elementary strong functional programming (ESFP) system. To be useful, ESFP should include structures such as streams which can be computationally unwound infinitely often. We describe a syntactic analysis to ensure that infinitely proceeding structures, which we shall term _codata_, are productive. This analysis is an extension of the check for _guardedness_ that has been used with definitions over coinductive types in Martin-Löf’s type theory and in the calculus of constructions. Our analysis is presented as a form of abstract interpretation that allows a wider syntactic class of corecursive definitions to be recognised as productive than in previous work. Thus programmers will have fewer restrictions on their use of infinite streams within a strongly normalizing functional language.\n",
    "references": [
      {
        "authors": [
          "INRIA",
          "CNRS"
        ],
        "title": "The Coq project",
        "year": 1996
      },
      {
        "author": "T. Coquand",
        "title": "Infinite objects in type theory",
        "year": 1993
      },
      {
        "authors": [
          "P. Cousot",
          "R. Cousot"
        ],
        "title": "Inductive definitions, semantics and abstract interpretation",
        "year": 1992
      },
      {
        "author": "E.W. Dijkstra",
        "title": "A discipline of programming",
        "year": 1976
      },
      {
        "author": "E. Giménez",
        "title": "Codifying guarded definitions with recursive schemes",
        "year": 1995
      },
      {
        "author": "J.R. Hindley",
        "title": "The principal type scheme of an object in combinatory logic",
        "year": 1969
      },
      {
        "author": "R.J.M. Hughes",
        "title": "Backwards analysis of functional programs",
        "year": 1988
      },
      {
        "author": "R.J.M. Hughes",
        "title": "Compile-time analysis of functional programs",
        "year": 1990
      },
      {
        "author": "R.J.M. Hughes",
        "title": "Why functional programming matters",
        "year": 1990
      },
      {
        "author": "S. Kamin",
        "title": "Head-strictness is not a monotonic abstract property",
        "year": 1992
      },
      {
        "author": "P. Martin-Löf",
        "title": "An intuitionistic theory of types: Predicative part",
        "year": 1973
      },
      {
        "authors": [
          "D. McAllester",
          "K. Arkoudas"
        ],
        "title": "Walther recursion",
        "year": 1996
      },
      {
        "authors": [
          "P.F. Mendler",
          "P. Panangaden",
          "R.L. Constable"
        ],
        "title": "Infinite objects in type theory",
        "year": 1987
      },
      {
        "author": "Robin Milner",
        "title": "A theory of type polymorphism in programming",
        "year": 1978
      },
      {
        "author": "Robin Milner",
        "title": "A calculus of communicating systems",
        "year": 1980
      },
      {
        "author": "L.C. Paulson",
        "title": "ML for the working programmer",
        "year": 1996
      },
      {
        "author": "J.J.M.M. Rutten",
        "title": "Universal coalgebra: A theory of systems",
        "year": 1996
      },
      {
        "author": "B.A. Sijtsma",
        "title": "On the productivity of recursive list definitions",
        "year": 1989
      },
      {
        "authors": [
          "Alastair Telford",
          "David Turner"
        ],
        "title": "Ensuring the productivity of infinite structures",
        "year": 1997
      },
      {
        "author": "S.J. Thompson",
        "title": "Type theory and functional programming",
        "year": 1991
      },
      {
        "author": "S.J. Thompson",
        "title": "Haskell: The craft of functional programming",
        "year": 1996
      },
      {
        "author": "David Turner",
        "title": "Miranda: A non-strict functional language with polymorphic types",
        "year": 1985
      },
      {
        "author": "David Turner",
        "title": "Research topics in functional programming",
        "year": 1990
      },
      {
        "author": "David Turner",
        "title": "Codata",
        "year": 1995
      },
      {
        "author": "David Turner",
        "title": "Elementary strong functional programming",
        "year": 1995
      }
    ]
  },
  {
    "authors": [
      "Alastair Telford",
      "David Turner"
    ],
    "title": "Ensuring the productivity of infinite structures",
    "year": 1997,
    "abstract": "It is our aim to develop an elementary strong functional programming (ESFP) system. To be useful, ESFP should include structures such as streams which can be computationally unwound infinitely often. We describe a syntactic analysis to ensure that infinitely proceeding structures, which we shall term _codata_, are productive. This analysis is an extension of the check for _guardedness_ that has been used with definitions over coinductive types in Martin-Löf’s type theory and in the calculus of constructions. Our analysis is presented as a form of abstract interpretation that allows a wider syntactic class of corecursive definitions to be recognised as productive than in previous work. Thus programmers will have fewer restrictions on their use of infinite streams within a strongly normalizing functional language.\n",
    "references": [
      {
        "authors": [
          "INRIA",
          "CNRS"
        ],
        "title": "The Coq project",
        "year": 1996
      },
      {
        "author": "T. Coquand",
        "title": "Infinite objects in type theory",
        "year": 1993
      },
      {
        "author": "P. Cousot",
        "title": "Types as abstract interpretations",
        "year": 1997
      },
      {
        "authors": [
          "P. Cousot",
          "R. Cousot"
        ],
        "title": "Inductive definitions, semantics and abstract interpretation",
        "year": 1992
      },
      {
        "authors": [
          "K. Davis",
          "Philip Wadler"
        ],
        "title": "Strictness analysis in 4D",
        "year": 1991
      },
      {
        "author": "E.W. Dijkstra",
        "title": "A discipline of programming",
        "year": 1976
      },
      {
        "author": "J. Giesl",
        "title": "Termination of nested and mutually recursive algorithms",
        "year": 1997
      },
      {
        "author": "E. Giménez",
        "title": "Codifying guarded definitions with recursive schemes",
        "year": 1995
      },
      {
        "author": "E. Giménez",
        "title": "Guardedness algorithm for co-inductive types",
        "year": 1997
      },
      {
        "authors": [
          "J.-Y. Girard",
          "P. Taylor",
          "Y. Lafont"
        ],
        "title": "Proofs and types",
        "year": 1989
      },
      {
        "author": "J.R. Hindley",
        "title": "The principal type scheme of an object in combinatory logic",
        "year": 1969
      },
      {
        "author": "R.J.M. Hughes",
        "title": "Backwards analysis of functional programs",
        "year": 1988
      },
      {
        "author": "R.J.M. Hughes",
        "title": "Compile-time analysis of functional programs",
        "year": 1990
      },
      {
        "author": "R.J.M. Hughes",
        "title": "Why functional programming matters",
        "year": 1990
      },
      {
        "authors": [
          "R.J.M. Hughes",
          "L. Pareto",
          "A. Sabry"
        ],
        "title": "Proving the correctness of reactive systems using sized types",
        "year": 1996
      },
      {
        "author": "S. Kamin",
        "title": "Head-strictness is not a monotonic abstract property",
        "year": 1992
      },
      {
        "author": "H. Mairson",
        "title": "Deciding ML typability is complete for deterministic exponential time",
        "year": 1990
      },
      {
        "author": "P. Martin-Löf",
        "title": "An intuitionistic theory of types: Predicative part",
        "year": 1973
      },
      {
        "authors": [
          "D. McAllester",
          "K. Arkoudas"
        ],
        "title": "Walther recursion",
        "year": 1996
      },
      {
        "authors": [
          "P.F. Mendler",
          "P. Panangaden",
          "R.L. Constable"
        ],
        "title": "Infinite objects in type theory",
        "year": 1987
      },
      {
        "author": "Robin Milner",
        "title": "A theory of type polymorphism in programming",
        "year": 1978
      },
      {
        "author": "Robin Milner",
        "title": "A calculus of communicating systems",
        "year": 1980
      },
      {
        "author": "L.C. Paulson",
        "title": "ML for the working programmer",
        "year": 1996
      },
      {
        "author": "J.J.M.M. Rutten",
        "title": "Universal coalgebra: A theory of systems",
        "year": 1996
      },
      {
        "author": "B.A. Sijtsma",
        "title": "On the productivity of recursive list definitions",
        "year": 1989
      },
      {
        "author": "S.J. Thompson",
        "title": "Type theory and functional programming",
        "year": 1991
      },
      {
        "author": "S.J. Thompson",
        "title": "Haskell: The craft of functional programming",
        "year": 1996
      },
      {
        "author": "David Turner",
        "title": "Miranda: A non-strict functional language with polymorphic types",
        "year": 1985
      },
      {
        "author": "David Turner",
        "title": "Research topics in functional programming",
        "year": 1990
      },
      {
        "author": "David Turner",
        "title": "Codata",
        "year": 1995
      },
      {
        "author": "David Turner",
        "title": "Elementary strong functional programming",
        "year": 1995
      },
      {
        "author": "Philip Wadler",
        "title": "Comprehending monads",
        "year": 1992
      }
    ]
  },
  {
    "author": "Alexander Kaganovsky",
    "title": "Computing with exact real numbers in a radix-r system",
    "year": 1999,
    "abstract": "This paper investigates an arithmetic based upon the representation of computable exact real numbers by lazy infinite sequences of signed digits in a positional radix-_r_ system. We discuss advantages and problems associated with this representation, and develop well-behaved algorithms for a comprehensive range of numeric operations, including the four basic operations of arithmetic.\n",
    "references": [
      {
        "author": "A. Avizienis",
        "title": "Binary-compatible signed-digit arithmetic",
        "year": 1964
      },
      {
        "author": "A. Avizienis",
        "title": "Signed-digit number representations for fast parallel arithmetic",
        "year": 1961
      },
      {
        "authors": [
          "H.-J. Boehm",
          "R. Cartwright",
          "et al."
        ],
        "title": "Exact real arithmetic: A case study in higher order programming",
        "year": 1986
      },
      {
        "authors": [
          "H. Boehm",
          "R. Cartwright"
        ],
        "title": "Exact real arithmetic: Formulating real numbers as functions",
        "year": 1990
      },
      {
        "authors": [
          "A. Edalat",
          "P.J. Potts"
        ],
        "title": "A new representation for exact real numbers",
        "year": 1997
      },
      {
        "author": "M.D. Ercegovac",
        "title": "On-line arithmetic: An overview",
        "year": 1984
      },
      {
        "author": "Alexander Kaganovsky",
        "title": "Computing with exact real numbers in a radix-r system",
        "year": 1998
      },
      {
        "author": "V. Ménissier-Morain",
        "title": "Arbitrary precision real arithmetic: Design and algorithms"
      },
      {
        "author": "J.-M. Muller",
        "title": "Arithmétique des ordinateurs",
        "year": 1989
      },
      {
        "author": "J. Myhill",
        "title": "What is a real number?",
        "year": 1972
      },
      {
        "author": "C.P. Pixley",
        "title": "Demand-driven arithmetic",
        "year": 1982
      },
      {
        "author": "J.E. Robertson",
        "title": "A new class of digital division methods",
        "year": 1958
      },
      {
        "author": "J. Schwarz",
        "title": "Implementing infinite precision arithmetic",
        "year": 1989
      },
      {
        "author": "D.M. Smith",
        "title": "A multiple-precision division algorithm",
        "year": 1996
      },
      {
        "author": "K.R. Stromberg",
        "title": "Introduction to classical real analysis",
        "year": 1981
      },
      {
        "author": "Alan Turing",
        "title": "On computable numbers, with an application to the Entscheidungsproblem",
        "year": 1936
      },
      {
        "author": "David Turner",
        "title": "An overview of Miranda",
        "year": 1986
      },
      {
        "author": "David Turner",
        "title": "SASL language manual",
        "year": 1976
      },
      {
        "author": "J.E. Vuillemin",
        "title": "Exact real computer arithmetic with continued fractions",
        "year": 1990
      },
      {
        "author": "E. Wiedmer",
        "title": "Computing with infinite objects",
        "year": 1980
      },
      {
        "author": "E. Wiedmer",
        "title": "Exaktes Rechnen mit reellen Zahlen und anderen unendlichen Objekten",
        "year": 1977
      }
    ]
  },
  {
    "author": "Alexander Kaganovsky",
    "title": "Exact complex arithmetic in an imaginary radix system",
    "year": 1999,
    "abstract": "This paper investigates an exact arithmetic based on the single-component representation of complex numbers by sequences of signed digits written to imaginary base _ri_. Algorithms for the four basic arithmetic operations in this representation are described and analyzed. The algorithms are to an unexpected extent scarcely different from their exact real equivalents, which significantly speeds up exact complex number manipulations.\n",
    "references": [
      {
        "author": "S. Lang",
        "title": "Algebra",
        "year": 1992
      },
      {
        "authors": [
          "W.H. Press",
          "S.A. Teukolsky",
          "W.T. Vetterling",
          "B.P. Flannery"
        ],
        "title": "Numerical recipes in C: The art of scientific computing",
        "year": 1995
      },
      {
        "author": "J.-M. Muller",
        "title": "Arithmétique des ordinateurs",
        "year": 1989
      },
      {
        "author": "W. Kahan",
        "title": "Branch cuts for complex elementary functions, or much ado about nothing’s sign bit",
        "year": 1987
      },
      {
        "authors": [
          "H.-J. Boehm",
          "R. Cartwright",
          "et al."
        ],
        "title": "Exact real arithmetic: A case study in higher order programming",
        "year": 1986
      },
      {
        "authors": [
          "H. Boehm",
          "R. Cartwright"
        ],
        "title": "Exact real arithmetic: Formulating real numbers as functions",
        "year": 1990
      },
      {
        "author": "E. Wiedmer",
        "title": "Computing with infinite objects",
        "year": 1980
      },
      {
        "author": "J.E. Vuillemin",
        "title": "Exact real computer arithmetic with continued fractions",
        "year": 1990
      },
      {
        "authors": [
          "A. Edalat",
          "P.J. Potts"
        ],
        "title": "A new representation for exact real numbers",
        "year": 1997
      },
      {
        "author": "Alexander Kaganovsky",
        "title": "Computing with exact real numbers in a radix-r system",
        "year": 1998
      },
      {
        "author": "D.E. Knuth",
        "title": "An imaginary number system",
        "year": 1960
      },
      {
        "author": "W. Penney",
        "title": "A ‘binary’ system for complex numbers",
        "year": 1965
      },
      {
        "author": "T.J. O’Reilly",
        "title": "A positional notation for complex numbers",
        "year": 1974
      },
      {
        "author": "W.N. Holmes",
        "title": "Representation for complex numbers",
        "year": 1978
      },
      {
        "author": "L.B. Wadel",
        "title": "Negative base number systems",
        "year": 1957
      },
      {
        "author": "G.F. Songster",
        "title": "Negative base number representation systems",
        "year": 1963
      },
      {
        "author": "M.P. de Regt",
        "title": "Negative radix arithmetic",
        "year": 1967
      },
      {
        "authors": [
          "P.V. Sankar",
          "S. Chakrabarti",
          "E.V. Krishnamurthy"
        ],
        "title": "Arithmetic algorithms in a negative base",
        "year": 1973
      },
      {
        "author": "Z. Pawlak",
        "title": "An electronic digital computer based on the ‘-2’ system",
        "year": 1959
      },
      {
        "author": "A. Avizienis",
        "title": "Signed-digit number representations for fast parallel arithmetic",
        "year": 1961
      },
      {
        "author": "C.K. Yuen",
        "title": "On the floating point representation of complex numbers",
        "year": 1975
      },
      {
        "author": "K.R. Stromberg",
        "title": "Introduction to classical real analysis",
        "year": 1981
      },
      {
        "author": "J.E. Robertson",
        "title": "A new class of digital division methods",
        "year": 1958
      },
      {
        "author": "D.M. Smith",
        "title": "A multiple-precision division algorithm",
        "year": 1996
      },
      {
        "author": "J. Schwarz",
        "title": "Implementing infinite precision arithmetic",
        "year": 1989
      }
    ]
  },
  {
    "authors": [
      "Alastair Telford",
      "David Turner"
    ],
    "title": "A hierarchy of languages with strong termination properties",
    "year": 2000,
    "abstract": "In previous papers we have proposed an elementary discipline of _strong_ functional programming (ESFP), in which all computations terminate. A key feature of the discipline is that we introduce a type distinction between _data_ which is known to be finite, and _codata_ which is (potentially) infinite. To ensure termination, recursion over data must be well-founded, and corecursion (the definition schema for codata) must be productive, and both of these restrictions must be enforced automatically by the compiler. In our previous work we used abstract interpretation to establish the productivity of corecursive definitions in an elementary strong functional language. We show here that similar ideas can be applied in the dual case to check whether recursive function definitions are strongly normalising. We thus exhibit a powerful termination analysis technique which we demonstrate can be extended to partial functions.\n",
    "references": [
      {
        "author": "A. Abel",
        "title": "Foetus: Termination checker for simple functional programs",
        "year": 1998
      },
      {
        "authors": [
          "F. Baader",
          "T. Nipkow"
        ],
        "title": "Term rewriting and all that",
        "year": 1998
      },
      {
        "author": "J. Brauburger",
        "title": "Automatic termination analysis for partial functions using polynomial orderings",
        "year": 1997
      },
      {
        "authors": [
          "J. Brauburger",
          "J. Giesl"
        ],
        "title": "Termination analysis by inductive evaluation",
        "year": 1998
      },
      {
        "authors": [
          "INRIA",
          "CNRS"
        ],
        "title": "The Coq project",
        "year": 1996
      },
      {
        "author": "T. Coquand",
        "title": "Infinite objects in type theory",
        "year": 1993
      },
      {
        "author": "P. Cousot",
        "title": "Semantic foundations of program analysis",
        "year": 1981
      },
      {
        "author": "P. Cousot",
        "title": "Abstract interpretation",
        "year": 1996
      },
      {
        "author": "P. Cousot",
        "title": "Abstract interpretation based static analysis parameterized by semantics",
        "year": 1997
      },
      {
        "author": "P. Cousot",
        "title": "Types as abstract interpretations",
        "year": 1997
      },
      {
        "authors": [
          "P. Cousot",
          "R. Cousot"
        ],
        "title": "Systematic design of program analysis frameworks",
        "year": 1979
      },
      {
        "authors": [
          "P. Cousot",
          "R. Cousot"
        ],
        "title": "Comparing the Galois connection and widening/narrowing approaches to abstract interpretation",
        "year": 1992
      },
      {
        "authors": [
          "K. Davis",
          "Philip Wadler"
        ],
        "title": "Strictness analysis in 4D",
        "year": 1991
      },
      {
        "authors": [
          "M.C.F. Ferreira",
          "H. Zantema"
        ],
        "title": "Syntactical analysis of total termination",
        "year": 1994
      },
      {
        "author": "J. Giesl",
        "title": "Termination analysis for functional programs using term orderings",
        "year": 1995
      },
      {
        "author": "J. Giesl",
        "title": "Termination of nested and mutually recursive algorithms",
        "year": 1997
      },
      {
        "author": "E. Giménez",
        "title": "Codifying guarded definitions with recursive schemes",
        "year": 1995
      },
      {
        "authors": [
          "Neil D. Jones",
          "Carsten K. Gomard",
          "Peter Sestoft"
        ],
        "title": "Partial evaluation and automatic program generation",
        "year": 1993
      },
      {
        "author": "S. Kamin",
        "title": "Head-strictness is not a monotonic abstract property",
        "year": 1992
      },
      {
        "author": "P. Martin-Löf",
        "title": "An intuitionistic theory of types: Predicative part",
        "year": 1973
      },
      {
        "authors": [
          "D. McAllester",
          "K. Arkoudas"
        ],
        "title": "Walther recursion",
        "year": 1996
      },
      {
        "author": "Robin Milner",
        "title": "A theory of type polymorphism in programming",
        "year": 1978
      },
      {
        "author": "Robin Milner",
        "title": "A calculus of communicating systems",
        "year": 1980
      },
      {
        "authors": [
          "R. Milner",
          "M. Tofte",
          "R. Harper",
          "D. MacQueen"
        ],
        "title": "The definition of Standard ML",
        "year": 1997
      },
      {
        "author": "Eric G.J.M.H. Nöcker",
        "title": "Strictness analysis using abstract reduction",
        "year": 1993
      },
      {
        "author": "J. Palsberg",
        "title": "Closure analysis in constraint form",
        "year": 1995
      },
      {
        "authors": [
          "S. Panitz",
          "M. Schmidt-Shauß"
        ],
        "title": "TEA: Automatically proving termination of programs in a non-strict higher-order functional language",
        "year": 1997
      },
      {
        "authors": [
          "S.L. Peyton Jones",
          "R.J.M. Hughes",
          "et al."
        ],
        "title": "Haskell 98: A non-strict, purely functional language",
        "year": 1999
      },
      {
        "author": "C. Reade",
        "title": "Elements of functional programming",
        "year": 1989
      },
      {
        "author": "K. Slind",
        "title": "TFL: An environment for terminating functional programs",
        "year": 1998
      },
      {
        "authors": [
          "Alastair Telford",
          "David Turner"
        ],
        "title": "Ensuring streams flow",
        "year": 1997
      },
      {
        "authors": [
          "Alastair Telford",
          "David Turner"
        ],
        "title": "Ensuring the productivity of infinite structures",
        "year": 1997
      },
      {
        "author": "S.J. Thompson",
        "title": "Type theory and functional programming",
        "year": 1991
      },
      {
        "author": "S.J. Thompson",
        "title": "Haskell: The craft of functional programming",
        "year": 1996
      },
      {
        "author": "David Turner",
        "title": "Miranda: A non-strict functional language with polymorphic types",
        "year": 1985
      },
      {
        "author": "David Turner",
        "title": "Elementary strong functional programming",
        "year": 1995
      },
      {
        "author": "P. Van Hentenryk",
        "title": "Static analysis",
        "year": 1997
      },
      {
        "author": "C. Walther",
        "title": "On proving termination of algorithms by machine",
        "year": 1994
      },
      {
        "author": "H. Zantema",
        "title": "Termination of context-sensitive rewriting",
        "year": 1997
      }
    ]
  },
  {
    "authors": [
      "Alastair Telford",
      "David Turner"
    ],
    "title": "Ensuring termination in ESFP",
    "year": 2000,
    "abstract": "In previous papers we have proposed an elementary discipline of _strong_ functional programming (ESFP), in which all computations terminate. A key feature of the discipline is that we introduce a type distinction between _data_ which is known to be finite, and _codata_ which is (potentially) infinite. To ensure termination, recursion over data must be well-founded, and corecursion (the definition schema for codata) must be productive, and both of these restrictions must be enforced automatically by the compiler. In our previous work we used abstract interpretation to establish the productivity of corecursive definitions in an elementary strong functional language. We show here that similar ideas can be applied in the dual case to check whether recursive function definitions are strongly normalising. We thus exhibit a powerful termination analysis technique which we demonstrate can be extended to partial functions.\n",
    "references": [
      {
        "author": "A. Abel",
        "title": "Foetus: Termination checker for simple functional programs",
        "year": 1998
      },
      {
        "authors": [
          "F. Baader",
          "T. Nipkow"
        ],
        "title": "Term rewriting and all that",
        "year": 1998
      },
      {
        "authors": [
          "J. Brauburger",
          "J. Giesl"
        ],
        "title": "Termination analysis by inductive evaluation",
        "year": 1998
      },
      {
        "author": "T. Coquand",
        "title": "Infinite objects in type theory",
        "year": 1993
      },
      {
        "author": "P. Cousot",
        "title": "Abstract interpretation",
        "year": 1996
      },
      {
        "author": "P. Cousot",
        "title": "Types as abstract interpretations",
        "year": 1997
      },
      {
        "authors": [
          "P. Cousot",
          "R. Cousot"
        ],
        "title": "Systematic design of program analysis frameworks",
        "year": 1979
      },
      {
        "authors": [
          "P. Cousot",
          "R. Cousot"
        ],
        "title": "Comparing the Galois connection and widening/narrowing approaches to abstract interpretation",
        "year": 1992
      },
      {
        "authors": [
          "M.C.F. Ferreira",
          "H. Zantema"
        ],
        "title": "Syntactical analysis of total termination",
        "year": 1994
      },
      {
        "author": "J. Giesl",
        "title": "Termination of nested and mutually recursive algorithms",
        "year": 1997
      },
      {
        "author": "E. Giménez",
        "title": "Codifying guarded definitions with recursive schemes",
        "year": 1995
      },
      {
        "authors": [
          "Neil D. Jones",
          "Carsten K. Gomard",
          "Peter Sestoft"
        ],
        "title": "Partial evaluation and automatic program generation",
        "year": 1993
      },
      {
        "author": "P. Martin-Löf",
        "title": "An intuitionistic theory of types: Predicative part",
        "year": 1973
      },
      {
        "authors": [
          "D. McAllester",
          "K. Arkoudas"
        ],
        "title": "Walther recursion",
        "year": 1996
      },
      {
        "author": "Robin Milner",
        "title": "A theory of type polymorphism in programming",
        "year": 1978
      },
      {
        "authors": [
          "R. Milner",
          "M. Tofte",
          "R. Harper",
          "D. MacQueen"
        ],
        "title": "The definition of Standard ML",
        "year": 1997
      },
      {
        "author": "Eric G.J.M.H. Nöcker",
        "title": "Strictness analysis using abstract reduction",
        "year": 1993
      },
      {
        "authors": [
          "S. Panitz",
          "M. Schmidt-Shauß"
        ],
        "title": "TEA: Automatically proving termination of programs in a non-strict higher-order functional language",
        "year": 1997
      },
      {
        "authors": [
          "S.L. Peyton Jones",
          "R.J.M. Hughes",
          "et al."
        ],
        "title": "Haskell 98: A non-strict, purely functional language",
        "year": 1999
      },
      {
        "author": "C. Reade",
        "title": "Elements of functional programming",
        "year": 1989
      },
      {
        "author": "K. Slind",
        "title": "TFL: An environment for terminating functional programs",
        "year": 1998
      },
      {
        "authors": [
          "Alastair Telford",
          "David Turner"
        ],
        "title": "Ensuring streams flow",
        "year": 1997
      },
      {
        "authors": [
          "Alastair Telford",
          "David Turner"
        ],
        "title": "Ensuring the productivity of infinite structures",
        "year": 1997
      },
      {
        "authors": [
          "Alastair Telford",
          "David Turner"
        ],
        "title": "A hierarchy of languages with strong termination properties",
        "year": 2000
      },
      {
        "author": "David Turner",
        "title": "Miranda: A non-strict functional language with polymorphic types",
        "year": 1985
      },
      {
        "author": "David Turner",
        "title": "Elementary strong functional programming",
        "year": 1995
      },
      {
        "author": "H. Zantema",
        "title": "Termination of context-sensitive rewriting",
        "year": 1997
      }
    ]
  },
  {
    "author": "David Turner",
    "title": "Final report: Elementary strong functional programming",
    "year": 2000,
    "references": [
      {
        "author": "Andreas Abel",
        "title": "Eine semantische Analyse struktureller Rekursion",
        "year": 1999
      },
      {
        "authors": [
          "Kostas Arkoudas",
          "David McAllester"
        ],
        "title": "Walther recursion",
        "year": 1996
      },
      {
        "authors": [
          "J.W. de Bakker",
          "J.N. Kok"
        ],
        "title": "Towards a uniform topological treatment of streams and functions over streams",
        "year": 1984
      },
      {
        "authors": [
          "H.-J. Boehm",
          "R.S. Cartwright"
        ],
        "title": "Exact real arithmetic: Formulating real numbers as functions",
        "year": 1990
      },
      {
        "author": "Thierry Coquand",
        "title": "Infinite objects in type theory",
        "year": 1993
      },
      {
        "author": "P. Cousot",
        "title": "Types as abstract interpretations",
        "year": 1997
      },
      {
        "author": "E. Giménez",
        "title": "Codifying guarded definitions with recursive schemes",
        "year": 1995
      },
      {
        "author": "Martin Hofmann",
        "title": "Linear types and non-size-increasing polynomial time computation",
        "year": 1999
      },
      {
        "authors": [
          "R.J.M. Hughes",
          "L. Pareto",
          "A. Sabry"
        ],
        "title": "Proving the correctness of reactive systems using sized types",
        "year": 1996
      },
      {
        "author": "Alexander Kaganovsky",
        "title": "Computing with exact real numbers in a radix-r system",
        "year": 1998
      },
      {
        "author": "Alexander Kaganovsky",
        "title": "Exact complex arithmetic in an imaginary radix system",
        "year": 1999
      },
      {
        "author": "Alexander Kaganovsky",
        "title": "Exact computing in positional weighted systems",
        "year": 2001
      },
      {
        "author": "C.P. Pixley",
        "title": "Demand-driven arithmetic",
        "year": 1982
      },
      {
        "authors": [
          "Alastair Telford",
          "David Turner"
        ],
        "title": "Ensuring streams flow",
        "year": 1997
      },
      {
        "authors": [
          "Alastair Telford",
          "David Turner"
        ],
        "title": "Ensuring the productivity of infinite structures",
        "year": 1997
      },
      {
        "authors": [
          "Alastair Telford",
          "David Turner"
        ],
        "title": "Ensuring termination in ESFP",
        "year": 2000
      },
      {
        "authors": [
          "Alastair Telford",
          "David Turner"
        ],
        "title": "A hierarchy of languages with strong termination properties",
        "year": 2000
      },
      {
        "author": "David Turner",
        "title": "Elementary strong functional programming",
        "year": 1995
      },
      {
        "author": "Philip Wadler",
        "title": "Strictness analysis aids time analysis",
        "year": 1988
      },
      {
        "author": "E. Wiedmer",
        "title": "Computing with infinite objects",
        "year": 1980
      }
    ]
  },
  {
    "author": "Alexander Kaganovsky",
    "title": "Exact computing in positional weighted systems",
    "year": 2001,
    "abstract": "This thesis presents a framework which allows one to perform infinite precision numerical computations using an arithmetic based upon the representation of computable numbers by lazy infinite sequences of digits in a redundant positional radix system. We discuss advantages and problems associated with this representation, and develop well-behaved algorithms for a comprehensive range of numeric operations, including the four basic operations of arithmetic, and a number of important elementary functions. We investigate the system of real numbers represented in an arbitrary radix _r_, and then show that the radix-_r_ algorithms also lend themselves with little modification to the unified representation of complex numbers in an imaginary radix, which significantly speeds up exact complex number manipulations. A full complexity analysis is given, which suggests that notwithstanding an earlier claim, positional number system representations can lead to efficient implementations of constructive arithmetic, and in particular, our algorithms largely overcome what has been known as the granularity effect. The algorithms have been implemented both in the functional programming language Miranda and imperative language C, and guidelines have been provided for optimizing and improving the existing implementations.\n",
    "references": [
      {
        "author": "O. Aberth",
        "title": "Computable analysis",
        "year": 1980
      },
      {
        "author": "D.P. Agrawal",
        "title": "Arithmetic algorithms in a negative base",
        "year": 1975
      },
      {
        "authors": [
          "G. Alefeld",
          "J. Herzberger"
        ],
        "title": "Introduction to interval computations",
        "year": 1983
      },
      {
        "author": "A. Avizienis",
        "title": "Binary-compatible signed-digit arithmetic",
        "year": 1964
      },
      {
        "author": "A. Avizienis",
        "title": "Signed-digit number representations for fast parallel arithmetic",
        "year": 1961
      },
      {
        "author": "D.H. Bailey",
        "title": "Algorithm 719: Multiprecision translation and execution of FORTRAN programs",
        "year": 1993
      },
      {
        "authors": [
          "David Bailey",
          "Peter Borwein",
          "Simon Plouffe"
        ],
        "title": "On the rapid computation of various polylogarithmic constants",
        "year": 1971
      },
      {
        "authors": [
          "Errett Bishop",
          "Douglas Bridges"
        ],
        "title": "Constructive analysis",
        "year": 1985
      },
      {
        "authors": [
          "L. Blum",
          "M. Shub",
          "S. Smale"
        ],
        "title": "On a theory of computation and complexity over the real numbers: NP-completeness, recursive functions and universal machines",
        "year": 1989
      },
      {
        "authors": [
          "H.-J. Boehm",
          "R. Cartwright",
          "et al."
        ],
        "title": "Exact real arithmetic: A case study in higher order programming",
        "year": 1986
      },
      {
        "authors": [
          "Hans Boehm",
          "Robert Cartwright"
        ],
        "title": "Exact real arithmetic: Formulating real numbers as functions",
        "year": 1990
      },
      {
        "authors": [
          "J.M. Borwein",
          "P.B. Borwein",
          "D.H. Bailey"
        ],
        "title": "Ramanujan, modular equations, and approximations to pi, or how to compute one billion digits of pi",
        "year": 1989
      },
      {
        "author": "R.P. Brent",
        "title": "Fast multiple-precision evaluation of elementary functions",
        "year": 1976
      },
      {
        "author": "K. Briggs",
        "title": "A precise calculation of the Feigenbaum constants",
        "year": 1991
      },
      {
        "author": "L.E.J. Brouwer",
        "title": "De Onbetrouwbaarheid der logische Principes",
        "year": 1908
      },
      {
        "author": "Georg Cantor",
        "title": "Contributions to the founding of the theory of transfinite numbers",
        "year": 1915
      },
      {
        "author": "Georg Cantor",
        "title": "Gesammelte Abhandlungen",
        "year": 1932
      },
      {
        "author": "Alonzo Church",
        "title": "An unsolvable problem of elementary number theory",
        "year": 1936
      },
      {
        "author": "Richard Dedekind",
        "title": "Essays on the theory of numbers",
        "year": 1948
      },
      {
        "author": "Richard Dedekind",
        "title": "Stetigkeit und irrationale Zahlen",
        "year": 1872
      },
      {
        "authors": [
          "P.J. Denning",
          "J.B. Dennis",
          "J.E. Qualitz"
        ],
        "title": "Machines, languages, and computation",
        "year": 1978
      },
      {
        "author": "M.P. de Regt",
        "title": "Negative radix arithmetic",
        "year": 1967
      },
      {
        "author": "P. di Gianantonio",
        "title": "A functional approach to real number computation",
        "year": 1993
      },
      {
        "author": "P. di Gianantonio",
        "title": "Real number computability and domain theory",
        "year": 1996
      },
      {
        "authors": [
          "A. Edalat",
          "P.J. Potts"
        ],
        "title": "A new representation for exact real numbers",
        "year": 1997
      },
      {
        "author": "M.D. Ercegovac",
        "title": "On-line arithmetic: An overview",
        "year": 1984
      },
      {
        "author": "M.H. Escardó",
        "title": "PCF extended with real numbers",
        "year": 1996
      },
      {
        "author": "J. Eve",
        "title": "The evaluation of polynomials",
        "year": 1964
      },
      {
        "author": "M.J. Feigenbaum",
        "title": "Quantitative universality for a class of nonlinear transformations",
        "year": 1978
      },
      {
        "author": "C.T. Fike",
        "title": "Methods of evaluating polynomials in function evaluation routines",
        "year": 1967
      },
      {
        "author": "H. Friedman",
        "title": "Algorithmic procedures, generalized Turing algorithms, and elementary recursion theory",
        "year": 1969
      },
      {
        "authors": [
          "H. Friedman",
          "K. Ko"
        ],
        "title": "Computational complexity of real functions",
        "year": 1982
      },
      {
        "author": "W. Gosper",
        "title": "Continued fraction arithmetic",
        "year": 1972
      },
      {
        "author": "T.L. Heath",
        "title": "The works of archimedes",
        "year": 1952
      },
      {
        "author": "A. Heyting",
        "title": "Intuitionism, an introduction",
        "year": 1966
      },
      {
        "author": "W.N. Holmes",
        "title": "Representation for complex numbers",
        "year": 1978
      },
      {
        "authors": [
          "R. Jones",
          "R. Lins"
        ],
        "title": "Garbage collection: Algorithms for automatic dynamic memory management",
        "year": 1996
      },
      {
        "author": "Alexander Kaganovsky",
        "title": "Computing with exact real numbers in a radix-r system",
        "year": 1998
      },
      {
        "author": "Alexander Kaganovsky",
        "title": "Exact complex arithmetic in an imaginary radix system",
        "year": 1999
      },
      {
        "author": "W. Kahan",
        "title": "Branch cuts for complex elementary functions, or much ado about nothing’s sign bit",
        "year": 1987
      },
      {
        "author": "S.C. Kleene",
        "title": "Introduction to metamathematics",
        "year": 1952
      },
      {
        "author": "D.E. Knuth",
        "title": "An imaginary number system",
        "year": 1960
      },
      {
        "author": "Donald E. Knuth",
        "title": "Mathematics and computer science: Coping with finiteness",
        "year": 1976
      },
      {
        "author": "D. Knuth",
        "title": "The art of computer programming, vol. 2: Seminumerical algorithms",
        "year": 1981
      },
      {
        "authors": [
          "P. Kornerup",
          "D.W. Matula"
        ],
        "title": "Finite precision lexicographic continued fraction number systems",
        "year": 1985
      },
      {
        "author": "Serge Lang",
        "title": "Algebra",
        "year": 1992
      },
      {
        "author": "Serge Lang",
        "title": "Complex analysis",
        "year": 1999
      },
      {
        "authors": [
          "L.A. Lyusternik",
          "O.A. Chervonenkis",
          "A.R. Yanpol’skii"
        ],
        "title": "Handbook for computing elementary functions",
        "year": 1965
      },
      {
        "author": "Christophe Mazenc",
        "title": "On the redundancy of real number representation systems",
        "year": 1993
      },
      {
        "author": "V. Ménissier-Morain",
        "title": "Arbitrary precision real arithmetic: Design and algorithms"
      },
      {
        "author": "R.E. Moore",
        "title": "Methods and applications of interval analysis",
        "year": 1979
      },
      {
        "author": "J.-M. Muller",
        "title": "Arithmétique des ordinateurs",
        "year": 1989
      },
      {
        "author": "John R. Myhill",
        "title": "A complete theory of natural, rational, and real numbers",
        "year": 1950
      },
      {
        "author": "John Myhill",
        "title": "What is a real number?",
        "year": 1972
      },
      {
        "authors": [
          "W.H. Press",
          "S.A. Teukolsky",
          "W.T. Vetterling",
          "B.P. Flannery"
        ],
        "title": "Numerical recipes in C: The art of scientific computing",
        "year": 1995
      },
      {
        "author": "Amos R. Omondi",
        "title": "Computer arithmetic systems: Algorithms, architecture and implementations",
        "year": 1994
      },
      {
        "author": "T.J. O’Reilly",
        "title": "A positional notation for complex numbers",
        "year": 1974
      },
      {
        "author": "Z. Pawlak",
        "title": "An electronic digital computer based on the ‘-2’ system",
        "year": 1959
      },
      {
        "authors": [
          "Z. Pawlak",
          "A. Wakulicz"
        ],
        "title": "Use of expansions with a negative basis in the arithmometer of a digital computer",
        "year": 1957
      },
      {
        "author": "W. Penney",
        "title": "A ‘binary’ system for complex numbers",
        "year": 1965
      },
      {
        "author": "C.P. Pixley",
        "title": "Demand-driven arithmetic",
        "year": 1982
      },
      {
        "author": "D. Plume",
        "title": "A calculator for exact real number computation",
        "year": 1998
      },
      {
        "authors": [
          "Marian B. Pour-El",
          "Ian J. Richards"
        ],
        "title": "Computability in analysis and physics",
        "year": 1989
      },
      {
        "authors": [
          "M.B. Pour-El",
          "I. Richards"
        ],
        "title": "Computability and noncomputability in classical analysis",
        "year": 1983
      },
      {
        "author": "H.G. Rice",
        "title": "Classes of recursively enumerable sets of positive integers and their decision problems",
        "year": 1953
      },
      {
        "author": "H.G. Rice",
        "title": "Recursive real numbers",
        "year": 1954
      },
      {
        "author": "J.E. Robertson",
        "title": "A new class of digital division methods",
        "year": 1958
      },
      {
        "author": "R.M. Robinson",
        "title": "Review",
        "year": 1951
      },
      {
        "author": "E. Salamin",
        "title": "Computation of pi using arithmetic-geometric mean",
        "year": 1976
      },
      {
        "author": "N.A. Sanin",
        "title": "Constructive real numbers and constructive function spaces",
        "year": 1968
      },
      {
        "authors": [
          "P.V. Sankar",
          "S. Chakrabarti",
          "E.V. Krishnamurthy"
        ],
        "title": "Arithmetic algorithms in a negative base",
        "year": 1973
      },
      {
        "author": "J. Schwarz",
        "title": "Implementing infinite precision arithmetic",
        "year": 1989
      },
      {
        "author": "Norman R. Scott",
        "title": "Computer number systems and arithmetic",
        "year": 1985
      },
      {
        "author": "A. Simpson",
        "title": "Lazy functional algorithms for exact real functionals",
        "year": 1998
      },
      {
        "author": "D.M. Smith",
        "title": "Algorithm 693: A FORTRAN package for floating-point multiple-precision arithmetic",
        "year": 1991
      },
      {
        "author": "D.M. Smith",
        "title": "A multiple-precision division algorithm",
        "year": 1996
      },
      {
        "author": "G.F. Songster",
        "title": "Negative base number representation systems",
        "year": 1963
      },
      {
        "author": "E. Specker",
        "title": "Nicht konstructiv beweisbare Sätze der Analysis",
        "year": 1949
      },
      {
        "author": "Karl R. Stromberg",
        "title": "Introduction to classical real analysis",
        "year": 1981
      },
      {
        "author": "Rolf Herken",
        "title": "The universal Turing machine: A half-century survey",
        "year": 1988
      },
      {
        "authors": [
          "K.S. Trivedi",
          "M.D. Ercegovac"
        ],
        "title": "On-line algorithms for division and multiplication",
        "year": 1977
      },
      {
        "author": "Alan Turing",
        "title": "On computable numbers, with an application to the Entscheidungsproblem",
        "year": 1936
      },
      {
        "author": "Alan Turing",
        "title": "On computable numbers, with an application to the Entscheidungsproblem: A correction",
        "year": 1937
      },
      {
        "author": "David Turner",
        "title": "Miranda: A non-strict functional language with polymorphic types",
        "year": 1985
      },
      {
        "author": "R.S. Varga",
        "title": "Scientific computation on mathematical problems and conjectures",
        "year": 1990
      },
      {
        "author": "Jean E. Vuillemin",
        "title": "Exact real computer arithmetic with continued fractions",
        "year": 1990
      },
      {
        "author": "L.B. Wadel",
        "title": "Negative base number systems",
        "year": 1957
      },
      {
        "author": "E. Wiedmer",
        "title": "Computing with infinite objects",
        "year": 1980
      },
      {
        "author": "E. Wiedmer",
        "title": "Exaktes Rechnen mit reellen Zahlen und anderen unendlichen Objekten",
        "year": 1977
      },
      {
        "author": "C.K. Yuen",
        "title": "On the floating point representation of complex numbers",
        "year": 1975
      },
      {
        "author": "I.D. Zaslavskii",
        "title": "Some properties of constructive real numbers and constructive functions",
        "year": 1966
      }
    ]
  },
  {
    "author": "David Turner",
    "title": "Total functional programming",
    "year": 2004,
    "abstract": "The driving idea of functional programming is to make programming more closely related to mathematics. A program in a functional language such as Haskell or Miranda consists of equations which are both computation rules and a basis for simple algebraic reasoning about the functions and data structures they define. The existing model of functional programming, although elegant and powerful, is compromised to a greater extent than is commonly recognised by the presence of partial functions. We consider a simple discipline of total functional programming designed to exclude the possibility of non-termination. Among other things this requires a type distinction between data, which is finite, and codata, which is potentially infinite.\n",
    "references": [
      {
        "author": "Andreas Abel",
        "title": "A semantic analysis of structural recursion",
        "year": 1999
      },
      {
        "authors": [
          "Kostas Arkoudas",
          "David McAllester"
        ],
        "title": "Walther recursion",
        "year": 1996
      },
      {
        "authors": [
          "R.S. Bird",
          "Philip Wadler"
        ],
        "title": "Introduction to functional programming",
        "year": 1988
      },
      {
        "author": "K. Gödel",
        "title": "On a hitherto unutilized extension of the finitary standpoint",
        "year": 1958
      },
      {
        "authors": [
          "R. Harper",
          "D. MacQueen",
          "R. Milner"
        ],
        "title": "Standard ML",
        "year": 1986
      },
      {
        "authors": [
          "Paul Hudak",
          "et al."
        ],
        "title": "Report on the programming language Haskell",
        "year": 1992
      },
      {
        "author": "Conor McBride",
        "title": "First order unification by structural recursion",
        "year": 2003
      },
      {
        "authors": [
          "B. Nordstrom",
          "K. Petersson",
          "J.M. Smith"
        ],
        "title": "Programming in Martin-Löf’s type theory: An introduction",
        "year": 1990
      },
      {
        "author": "A.M. Pitts",
        "title": "A co-induction principle for recursively defined domains",
        "year": 1994
      },
      {
        "author": "Colin Runciman",
        "title": "What about the natural numbers",
        "year": 1989
      },
      {
        "authors": [
          "Alastair Telford",
          "David Turner"
        ],
        "title": "Ensuring streams flow",
        "year": 1997
      },
      {
        "authors": [
          "Alastair Telford",
          "David Turner"
        ],
        "title": "Ensuring termination in ESFP",
        "year": 2000
      },
      {
        "author": "David Turner",
        "title": "Functional programming and proofs of program correctness",
        "year": 1982
      },
      {
        "author": "David Turner",
        "title": "An overview of Miranda",
        "year": 1986
      },
      {
        "author": "David Turner",
        "title": "Elementary strong functional programming",
        "year": 1995
      },
      {
        "authors": [
          "Philip Wadler",
          "Walid Taha",
          "David McQueen"
        ],
        "title": "How to add laziness to a strict language without even being odd",
        "year": 1998
      }
    ]
  },
  {
    "author": "David Turner",
    "title": "Church’s thesis and functional programming",
    "year": 2006,
    "references": [
      {
        "authors": [
          "S. Abramsky",
          "A. Jung"
        ],
        "title": "Domain theory",
        "year": 1994
      },
      {
        "author": "H.P. Barendregt",
        "title": "The lambda calculus: Its syntax and semantics",
        "year": 1984
      },
      {
        "author": "A. Church",
        "title": "An unsolvable problem of elementary number theory",
        "year": 1936
      },
      {
        "author": "A. Church",
        "title": "Review of A.M. Turing (1936) “On computable numbers…”",
        "year": 1937
      },
      {
        "author": "A. Church",
        "title": "The calculi of lambda conversion",
        "year": 1941
      },
      {
        "authors": [
          "R.L. Constable",
          "et al."
        ],
        "title": "Implementing mathematics with the Nuprl proof development system",
        "year": 1986
      },
      {
        "authors": [
          "Robert L. Constable",
          "Scott F. Smith"
        ],
        "title": "Computational foundations of basic recursive function theory",
        "year": 1988
      },
      {
        "authors": [
          "H.B. Curry",
          "R. Feys"
        ],
        "title": "Combinatory logic, vol. 1",
        "year": 1958
      },
      {
        "author": "M.H. Escardo",
        "title": "Real PCF extended with existential is universal",
        "year": 1996
      },
      {
        "author": "J.-Y. Girard",
        "title": "Une extension de l’interpretation fonctionnelle de Gödel a l’analyse et son application a l’elimination des coupures dans l’analyse et la theorie des types",
        "year": 1971
      },
      {
        "authors": [
          "Jean-Yves Girard",
          "Yves Lafont",
          "Paul Taylor"
        ],
        "title": "Proofs and types",
        "year": 1989
      },
      {
        "author": "K. Gödel",
        "title": "On undecidable propositions of formal mathematical systems",
        "year": 1934
      },
      {
        "author": "K. Gödel",
        "title": "On a hitherto unutilized extension of the finitary standpoint",
        "year": 1958
      },
      {
        "authors": [
          "N.D. Goodman",
          "J. Myhill"
        ],
        "title": "Choice implies excluded middle",
        "year": 1978
      },
      {
        "author": "J. Herbrand",
        "title": "Sur la non-contradiction de l’arithmetique",
        "year": 1932
      },
      {
        "author": "Andrew Hodges",
        "title": "Did Church and Turing have a thesis about machines?",
        "year": 2006
      },
      {
        "author": "J. Hughes",
        "title": "The design and implementation of programming languages",
        "year": 1983
      },
      {
        "author": "W. Howard",
        "title": "The formulae as types notion of construction",
        "year": 1969
      },
      {
        "author": "Thomas Johnsson",
        "title": "Lambda lifting: Transforming programs to recursive equations",
        "year": 1985
      },
      {
        "author": "S.C. Kleene",
        "title": "Lambda-definability and recursiveness",
        "year": 1936
      },
      {
        "author": "P.J. Landin",
        "title": "The next 700 programming languages",
        "year": 1966
      },
      {
        "author": "John McCarthy",
        "title": "Recursive functions of symbolic expressions and their computation by machine",
        "year": 1960
      },
      {
        "authors": [
          "F. Major",
          "M. Turcotte",
          "et al."
        ],
        "title": "The combination of symbolic and numerical computation for three-dimensional modelling of RNA",
        "year": 1991
      },
      {
        "author": "P. Martin-Löf",
        "title": "An intuitionistic theory of types: Predicative part",
        "year": 1973
      },
      {
        "author": "P. Martin-Löf",
        "title": "Constructive mathematics and computer programming",
        "year": 1982
      },
      {
        "author": "R. Milner",
        "title": "A theory of type polymorphism in programming",
        "year": 1978
      },
      {
        "author": "J. Myhill",
        "title": "Constructive set theory",
        "year": 1975
      },
      {
        "authors": [
          "Rex L. Page",
          "Brian D. Moe"
        ],
        "title": "Experience with a large scientific application in a functional language",
        "year": 1993
      },
      {
        "author": "S.L. Peyton Jones",
        "title": "Implementing lazy functional languages on stock hardware: The spineless tagless G-machine",
        "year": 1992
      },
      {
        "author": "S.L. Peyton Jones",
        "title": "Haskell 98 language and libraries: The revised report",
        "year": 2003
      },
      {
        "author": "G. Plotkin",
        "title": "LCF considered as a programming language",
        "year": 1977
      },
      {
        "author": "Moses Schönfinkel",
        "title": "Über die Bausteine der mathematischen Logik",
        "year": 1924
      },
      {
        "author": "Dana Scott",
        "title": "Data types as lattices",
        "year": 1976
      },
      {
        "author": "Scott F. Smith",
        "title": "Partial objects in type theory",
        "year": 1989
      },
      {
        "author": "Christopher Strachey",
        "title": "Fundamental concepts in programming languages",
        "year": 1967
      },
      {
        "authors": [
          "Dana Scott",
          "Christopher Strachey"
        ],
        "title": "Toward a mathematical semantics for computer languages",
        "year": 1971
      },
      {
        "author": "Paul Taylor",
        "title": "Abstract stone duality",
        "year": 2002
      },
      {
        "author": "Alan Turing",
        "title": "On computable numbers, with an application to the Entscheidungsproblem",
        "year": 1936
      },
      {
        "author": "David Turner",
        "title": "SASL language manual",
        "year": 1976
      },
      {
        "author": "David Turner",
        "title": "A new implementation technique for applicative languages",
        "year": 1979
      },
      {
        "author": "David Turner",
        "title": "Another algorithm for bracket abstraction",
        "year": 1979
      },
      {
        "author": "David Turner",
        "title": "An overview of Miranda",
        "year": 1986
      },
      {
        "author": "David Turner",
        "title": "Total functional programming",
        "year": 2004
      },
      {
        "author": "C.P. Wadsworth",
        "title": "The semantics and pragmatics of the lambda calculus",
        "year": 1971
      }
    ]
  }
]
