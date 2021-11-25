/*
 * This file was automatically generated. It is better to run the generator again, than to manually edit.
 *
 * @ffi-packager/ffi-generate v2.0.2
 * - git commit v2.0.2-5-gd4c32da-dirty on branch (no git branch)
 * - Homebrew clang version 12.0.0
 * https://github.com/node-ffi-packager/node-ffi-generate
 *
 * File:
 * - Name: "Index.h"
 * - SHA256: 672e3f4851d379779edd031c1190010f9db3e58146c51d936c130d2115270fef
 *
 * Generator options:
 * - Library: "libclang"
 * - Single file: false
 * - Prefixes: ["clang","CX"]
 * - Compiler arguments: ["-I/usr/local/Cellar/llvm/12.0.0_1/include","-D__STDC_CONSTANT_MACROS","-D__STDC_FORMAT_MACROS","-D__STDC_LIMIT_MACROS"]
 */

const FFI = require("ffi-napi");
const ref = require("ref-napi");
const ArrayType = require("ref-array-di")(ref);
const Struct = require("ref-struct-di")(ref);
const Union = require("ref-union-di")(ref);

const constants = {
  "CXAvailabilityKind": {
      CXAvailability_Available: 0,
      CXAvailability_Deprecated: 1,
      CXAvailability_NotAvailable: 2,
      CXAvailability_NotAccessible: 3,
      "0": "CXAvailability_Available",
      "1": "CXAvailability_Deprecated",
      "2": "CXAvailability_NotAvailable",
      "3": "CXAvailability_NotAccessible",
  },
  "CXCallingConv": {
      CXCallingConv_Default: 0,
      CXCallingConv_C: 1,
      CXCallingConv_X86StdCall: 2,
      CXCallingConv_X86FastCall: 3,
      CXCallingConv_X86ThisCall: 4,
      CXCallingConv_X86Pascal: 5,
      CXCallingConv_AAPCS: 6,
      CXCallingConv_AAPCS_VFP: 7,
      CXCallingConv_X86RegCall: 8,
      CXCallingConv_IntelOclBicc: 9,
      CXCallingConv_Win64: 10,
      CXCallingConv_X86_64Win64: 10,
      CXCallingConv_X86_64SysV: 11,
      CXCallingConv_X86VectorCall: 12,
      CXCallingConv_Swift: 13,
      CXCallingConv_PreserveMost: 14,
      CXCallingConv_PreserveAll: 15,
      CXCallingConv_AArch64VectorCall: 16,
      CXCallingConv_Invalid: 100,
      CXCallingConv_Unexposed: 200,
      "0": "CXCallingConv_Default",
      "1": "CXCallingConv_C",
      "2": "CXCallingConv_X86StdCall",
      "3": "CXCallingConv_X86FastCall",
      "4": "CXCallingConv_X86ThisCall",
      "5": "CXCallingConv_X86Pascal",
      "6": "CXCallingConv_AAPCS",
      "7": "CXCallingConv_AAPCS_VFP",
      "8": "CXCallingConv_X86RegCall",
      "9": "CXCallingConv_IntelOclBicc",
      "10": "CXCallingConv_Win64",
      "10": "CXCallingConv_X86_64Win64",
      "11": "CXCallingConv_X86_64SysV",
      "12": "CXCallingConv_X86VectorCall",
      "13": "CXCallingConv_Swift",
      "14": "CXCallingConv_PreserveMost",
      "15": "CXCallingConv_PreserveAll",
      "16": "CXCallingConv_AArch64VectorCall",
      "100": "CXCallingConv_Invalid",
      "200": "CXCallingConv_Unexposed",
  },
  "CXChildVisitResult": {
      CXChildVisit_Break: 0,
      CXChildVisit_Continue: 1,
      CXChildVisit_Recurse: 2,
      "0": "CXChildVisit_Break",
      "1": "CXChildVisit_Continue",
      "2": "CXChildVisit_Recurse",
  },
  "CXCodeComplete_Flags": {
      CXCodeComplete_IncludeMacros: 1,
      CXCodeComplete_IncludeCodePatterns: 2,
      CXCodeComplete_IncludeBriefComments: 4,
      CXCodeComplete_SkipPreamble: 8,
      CXCodeComplete_IncludeCompletionsWithFixIts: 16,
      "1": "CXCodeComplete_IncludeMacros",
      "2": "CXCodeComplete_IncludeCodePatterns",
      "4": "CXCodeComplete_IncludeBriefComments",
      "8": "CXCodeComplete_SkipPreamble",
      "16": "CXCodeComplete_IncludeCompletionsWithFixIts",
  },
  "CXCompletionChunkKind": {
      CXCompletionChunk_Optional: 0,
      CXCompletionChunk_TypedText: 1,
      CXCompletionChunk_Text: 2,
      CXCompletionChunk_Placeholder: 3,
      CXCompletionChunk_Informative: 4,
      CXCompletionChunk_CurrentParameter: 5,
      CXCompletionChunk_LeftParen: 6,
      CXCompletionChunk_RightParen: 7,
      CXCompletionChunk_LeftBracket: 8,
      CXCompletionChunk_RightBracket: 9,
      CXCompletionChunk_LeftBrace: 10,
      CXCompletionChunk_RightBrace: 11,
      CXCompletionChunk_LeftAngle: 12,
      CXCompletionChunk_RightAngle: 13,
      CXCompletionChunk_Comma: 14,
      CXCompletionChunk_ResultType: 15,
      CXCompletionChunk_Colon: 16,
      CXCompletionChunk_SemiColon: 17,
      CXCompletionChunk_Equal: 18,
      CXCompletionChunk_HorizontalSpace: 19,
      CXCompletionChunk_VerticalSpace: 20,
      "0": "CXCompletionChunk_Optional",
      "1": "CXCompletionChunk_TypedText",
      "2": "CXCompletionChunk_Text",
      "3": "CXCompletionChunk_Placeholder",
      "4": "CXCompletionChunk_Informative",
      "5": "CXCompletionChunk_CurrentParameter",
      "6": "CXCompletionChunk_LeftParen",
      "7": "CXCompletionChunk_RightParen",
      "8": "CXCompletionChunk_LeftBracket",
      "9": "CXCompletionChunk_RightBracket",
      "10": "CXCompletionChunk_LeftBrace",
      "11": "CXCompletionChunk_RightBrace",
      "12": "CXCompletionChunk_LeftAngle",
      "13": "CXCompletionChunk_RightAngle",
      "14": "CXCompletionChunk_Comma",
      "15": "CXCompletionChunk_ResultType",
      "16": "CXCompletionChunk_Colon",
      "17": "CXCompletionChunk_SemiColon",
      "18": "CXCompletionChunk_Equal",
      "19": "CXCompletionChunk_HorizontalSpace",
      "20": "CXCompletionChunk_VerticalSpace",
  },
  "CXCompletionContext": {
      CXCompletionContext_Unexposed: 0,
      CXCompletionContext_AnyType: 1,
      CXCompletionContext_AnyValue: 2,
      CXCompletionContext_ObjCObjectValue: 4,
      CXCompletionContext_ObjCSelectorValue: 8,
      CXCompletionContext_CXXClassTypeValue: 16,
      CXCompletionContext_DotMemberAccess: 32,
      CXCompletionContext_ArrowMemberAccess: 64,
      CXCompletionContext_ObjCPropertyAccess: 128,
      CXCompletionContext_EnumTag: 256,
      CXCompletionContext_UnionTag: 512,
      CXCompletionContext_StructTag: 1024,
      CXCompletionContext_ClassTag: 2048,
      CXCompletionContext_Namespace: 4096,
      CXCompletionContext_NestedNameSpecifier: 8192,
      CXCompletionContext_ObjCInterface: 16384,
      CXCompletionContext_ObjCProtocol: 32768,
      CXCompletionContext_ObjCCategory: 65536,
      CXCompletionContext_ObjCInstanceMessage: 131072,
      CXCompletionContext_ObjCClassMessage: 262144,
      CXCompletionContext_ObjCSelectorName: 524288,
      CXCompletionContext_MacroName: 1048576,
      CXCompletionContext_NaturalLanguage: 2097152,
      CXCompletionContext_IncludedFile: 4194304,
      CXCompletionContext_Unknown: 8388607,
      "0": "CXCompletionContext_Unexposed",
      "1": "CXCompletionContext_AnyType",
      "2": "CXCompletionContext_AnyValue",
      "4": "CXCompletionContext_ObjCObjectValue",
      "8": "CXCompletionContext_ObjCSelectorValue",
      "16": "CXCompletionContext_CXXClassTypeValue",
      "32": "CXCompletionContext_DotMemberAccess",
      "64": "CXCompletionContext_ArrowMemberAccess",
      "128": "CXCompletionContext_ObjCPropertyAccess",
      "256": "CXCompletionContext_EnumTag",
      "512": "CXCompletionContext_UnionTag",
      "1024": "CXCompletionContext_StructTag",
      "2048": "CXCompletionContext_ClassTag",
      "4096": "CXCompletionContext_Namespace",
      "8192": "CXCompletionContext_NestedNameSpecifier",
      "16384": "CXCompletionContext_ObjCInterface",
      "32768": "CXCompletionContext_ObjCProtocol",
      "65536": "CXCompletionContext_ObjCCategory",
      "131072": "CXCompletionContext_ObjCInstanceMessage",
      "262144": "CXCompletionContext_ObjCClassMessage",
      "524288": "CXCompletionContext_ObjCSelectorName",
      "1048576": "CXCompletionContext_MacroName",
      "2097152": "CXCompletionContext_NaturalLanguage",
      "4194304": "CXCompletionContext_IncludedFile",
      "8388607": "CXCompletionContext_Unknown",
  },
  "CXCursorKind": {
      CXCursor_UnexposedDecl: 1,
      CXCursor_StructDecl: 2,
      CXCursor_UnionDecl: 3,
      CXCursor_ClassDecl: 4,
      CXCursor_EnumDecl: 5,
      CXCursor_FieldDecl: 6,
      CXCursor_EnumConstantDecl: 7,
      CXCursor_FunctionDecl: 8,
      CXCursor_VarDecl: 9,
      CXCursor_ParmDecl: 10,
      CXCursor_ObjCInterfaceDecl: 11,
      CXCursor_ObjCCategoryDecl: 12,
      CXCursor_ObjCProtocolDecl: 13,
      CXCursor_ObjCPropertyDecl: 14,
      CXCursor_ObjCIvarDecl: 15,
      CXCursor_ObjCInstanceMethodDecl: 16,
      CXCursor_ObjCClassMethodDecl: 17,
      CXCursor_ObjCImplementationDecl: 18,
      CXCursor_ObjCCategoryImplDecl: 19,
      CXCursor_TypedefDecl: 20,
      CXCursor_CXXMethod: 21,
      CXCursor_Namespace: 22,
      CXCursor_LinkageSpec: 23,
      CXCursor_Constructor: 24,
      CXCursor_Destructor: 25,
      CXCursor_ConversionFunction: 26,
      CXCursor_TemplateTypeParameter: 27,
      CXCursor_NonTypeTemplateParameter: 28,
      CXCursor_TemplateTemplateParameter: 29,
      CXCursor_FunctionTemplate: 30,
      CXCursor_ClassTemplate: 31,
      CXCursor_ClassTemplatePartialSpecialization: 32,
      CXCursor_NamespaceAlias: 33,
      CXCursor_UsingDirective: 34,
      CXCursor_UsingDeclaration: 35,
      CXCursor_TypeAliasDecl: 36,
      CXCursor_ObjCSynthesizeDecl: 37,
      CXCursor_ObjCDynamicDecl: 38,
      CXCursor_CXXAccessSpecifier: 39,
      CXCursor_FirstDecl: 1,
      CXCursor_LastDecl: 39,
      CXCursor_FirstRef: 40,
      CXCursor_ObjCSuperClassRef: 40,
      CXCursor_ObjCProtocolRef: 41,
      CXCursor_ObjCClassRef: 42,
      CXCursor_TypeRef: 43,
      CXCursor_CXXBaseSpecifier: 44,
      CXCursor_TemplateRef: 45,
      CXCursor_NamespaceRef: 46,
      CXCursor_MemberRef: 47,
      CXCursor_LabelRef: 48,
      CXCursor_OverloadedDeclRef: 49,
      CXCursor_VariableRef: 50,
      CXCursor_LastRef: 50,
      CXCursor_FirstInvalid: 70,
      CXCursor_InvalidFile: 70,
      CXCursor_NoDeclFound: 71,
      CXCursor_NotImplemented: 72,
      CXCursor_InvalidCode: 73,
      CXCursor_LastInvalid: 73,
      CXCursor_FirstExpr: 100,
      CXCursor_UnexposedExpr: 100,
      CXCursor_DeclRefExpr: 101,
      CXCursor_MemberRefExpr: 102,
      CXCursor_CallExpr: 103,
      CXCursor_ObjCMessageExpr: 104,
      CXCursor_BlockExpr: 105,
      CXCursor_IntegerLiteral: 106,
      CXCursor_FloatingLiteral: 107,
      CXCursor_ImaginaryLiteral: 108,
      CXCursor_StringLiteral: 109,
      CXCursor_CharacterLiteral: 110,
      CXCursor_ParenExpr: 111,
      CXCursor_UnaryOperator: 112,
      CXCursor_ArraySubscriptExpr: 113,
      CXCursor_BinaryOperator: 114,
      CXCursor_CompoundAssignOperator: 115,
      CXCursor_ConditionalOperator: 116,
      CXCursor_CStyleCastExpr: 117,
      CXCursor_CompoundLiteralExpr: 118,
      CXCursor_InitListExpr: 119,
      CXCursor_AddrLabelExpr: 120,
      CXCursor_StmtExpr: 121,
      CXCursor_GenericSelectionExpr: 122,
      CXCursor_GNUNullExpr: 123,
      CXCursor_CXXStaticCastExpr: 124,
      CXCursor_CXXDynamicCastExpr: 125,
      CXCursor_CXXReinterpretCastExpr: 126,
      CXCursor_CXXConstCastExpr: 127,
      CXCursor_CXXFunctionalCastExpr: 128,
      CXCursor_CXXTypeidExpr: 129,
      CXCursor_CXXBoolLiteralExpr: 130,
      CXCursor_CXXNullPtrLiteralExpr: 131,
      CXCursor_CXXThisExpr: 132,
      CXCursor_CXXThrowExpr: 133,
      CXCursor_CXXNewExpr: 134,
      CXCursor_CXXDeleteExpr: 135,
      CXCursor_UnaryExpr: 136,
      CXCursor_ObjCStringLiteral: 137,
      CXCursor_ObjCEncodeExpr: 138,
      CXCursor_ObjCSelectorExpr: 139,
      CXCursor_ObjCProtocolExpr: 140,
      CXCursor_ObjCBridgedCastExpr: 141,
      CXCursor_PackExpansionExpr: 142,
      CXCursor_SizeOfPackExpr: 143,
      CXCursor_LambdaExpr: 144,
      CXCursor_ObjCBoolLiteralExpr: 145,
      CXCursor_ObjCSelfExpr: 146,
      CXCursor_OMPArraySectionExpr: 147,
      CXCursor_ObjCAvailabilityCheckExpr: 148,
      CXCursor_FixedPointLiteral: 149,
      CXCursor_OMPArrayShapingExpr: 150,
      CXCursor_OMPIteratorExpr: 151,
      CXCursor_CXXAddrspaceCastExpr: 152,
      CXCursor_LastExpr: 152,
      CXCursor_FirstStmt: 200,
      CXCursor_UnexposedStmt: 200,
      CXCursor_LabelStmt: 201,
      CXCursor_CompoundStmt: 202,
      CXCursor_CaseStmt: 203,
      CXCursor_DefaultStmt: 204,
      CXCursor_IfStmt: 205,
      CXCursor_SwitchStmt: 206,
      CXCursor_WhileStmt: 207,
      CXCursor_DoStmt: 208,
      CXCursor_ForStmt: 209,
      CXCursor_GotoStmt: 210,
      CXCursor_IndirectGotoStmt: 211,
      CXCursor_ContinueStmt: 212,
      CXCursor_BreakStmt: 213,
      CXCursor_ReturnStmt: 214,
      CXCursor_GCCAsmStmt: 215,
      CXCursor_AsmStmt: 215,
      CXCursor_ObjCAtTryStmt: 216,
      CXCursor_ObjCAtCatchStmt: 217,
      CXCursor_ObjCAtFinallyStmt: 218,
      CXCursor_ObjCAtThrowStmt: 219,
      CXCursor_ObjCAtSynchronizedStmt: 220,
      CXCursor_ObjCAutoreleasePoolStmt: 221,
      CXCursor_ObjCForCollectionStmt: 222,
      CXCursor_CXXCatchStmt: 223,
      CXCursor_CXXTryStmt: 224,
      CXCursor_CXXForRangeStmt: 225,
      CXCursor_SEHTryStmt: 226,
      CXCursor_SEHExceptStmt: 227,
      CXCursor_SEHFinallyStmt: 228,
      CXCursor_MSAsmStmt: 229,
      CXCursor_NullStmt: 230,
      CXCursor_DeclStmt: 231,
      CXCursor_OMPParallelDirective: 232,
      CXCursor_OMPSimdDirective: 233,
      CXCursor_OMPForDirective: 234,
      CXCursor_OMPSectionsDirective: 235,
      CXCursor_OMPSectionDirective: 236,
      CXCursor_OMPSingleDirective: 237,
      CXCursor_OMPParallelForDirective: 238,
      CXCursor_OMPParallelSectionsDirective: 239,
      CXCursor_OMPTaskDirective: 240,
      CXCursor_OMPMasterDirective: 241,
      CXCursor_OMPCriticalDirective: 242,
      CXCursor_OMPTaskyieldDirective: 243,
      CXCursor_OMPBarrierDirective: 244,
      CXCursor_OMPTaskwaitDirective: 245,
      CXCursor_OMPFlushDirective: 246,
      CXCursor_SEHLeaveStmt: 247,
      CXCursor_OMPOrderedDirective: 248,
      CXCursor_OMPAtomicDirective: 249,
      CXCursor_OMPForSimdDirective: 250,
      CXCursor_OMPParallelForSimdDirective: 251,
      CXCursor_OMPTargetDirective: 252,
      CXCursor_OMPTeamsDirective: 253,
      CXCursor_OMPTaskgroupDirective: 254,
      CXCursor_OMPCancellationPointDirective: 255,
      CXCursor_OMPCancelDirective: 256,
      CXCursor_OMPTargetDataDirective: 257,
      CXCursor_OMPTaskLoopDirective: 258,
      CXCursor_OMPTaskLoopSimdDirective: 259,
      CXCursor_OMPDistributeDirective: 260,
      CXCursor_OMPTargetEnterDataDirective: 261,
      CXCursor_OMPTargetExitDataDirective: 262,
      CXCursor_OMPTargetParallelDirective: 263,
      CXCursor_OMPTargetParallelForDirective: 264,
      CXCursor_OMPTargetUpdateDirective: 265,
      CXCursor_OMPDistributeParallelForDirective: 266,
      CXCursor_OMPDistributeParallelForSimdDirective: 267,
      CXCursor_OMPDistributeSimdDirective: 268,
      CXCursor_OMPTargetParallelForSimdDirective: 269,
      CXCursor_OMPTargetSimdDirective: 270,
      CXCursor_OMPTeamsDistributeDirective: 271,
      CXCursor_OMPTeamsDistributeSimdDirective: 272,
      CXCursor_OMPTeamsDistributeParallelForSimdDirective: 273,
      CXCursor_OMPTeamsDistributeParallelForDirective: 274,
      CXCursor_OMPTargetTeamsDirective: 275,
      CXCursor_OMPTargetTeamsDistributeDirective: 276,
      CXCursor_OMPTargetTeamsDistributeParallelForDirective: 277,
      CXCursor_OMPTargetTeamsDistributeParallelForSimdDirective: 278,
      CXCursor_OMPTargetTeamsDistributeSimdDirective: 279,
      CXCursor_BuiltinBitCastExpr: 280,
      CXCursor_OMPMasterTaskLoopDirective: 281,
      CXCursor_OMPParallelMasterTaskLoopDirective: 282,
      CXCursor_OMPMasterTaskLoopSimdDirective: 283,
      CXCursor_OMPParallelMasterTaskLoopSimdDirective: 284,
      CXCursor_OMPParallelMasterDirective: 285,
      CXCursor_OMPDepobjDirective: 286,
      CXCursor_OMPScanDirective: 287,
      CXCursor_LastStmt: 287,
      CXCursor_TranslationUnit: 300,
      CXCursor_FirstAttr: 400,
      CXCursor_UnexposedAttr: 400,
      CXCursor_IBActionAttr: 401,
      CXCursor_IBOutletAttr: 402,
      CXCursor_IBOutletCollectionAttr: 403,
      CXCursor_CXXFinalAttr: 404,
      CXCursor_CXXOverrideAttr: 405,
      CXCursor_AnnotateAttr: 406,
      CXCursor_AsmLabelAttr: 407,
      CXCursor_PackedAttr: 408,
      CXCursor_PureAttr: 409,
      CXCursor_ConstAttr: 410,
      CXCursor_NoDuplicateAttr: 411,
      CXCursor_CUDAConstantAttr: 412,
      CXCursor_CUDADeviceAttr: 413,
      CXCursor_CUDAGlobalAttr: 414,
      CXCursor_CUDAHostAttr: 415,
      CXCursor_CUDASharedAttr: 416,
      CXCursor_VisibilityAttr: 417,
      CXCursor_DLLExport: 418,
      CXCursor_DLLImport: 419,
      CXCursor_NSReturnsRetained: 420,
      CXCursor_NSReturnsNotRetained: 421,
      CXCursor_NSReturnsAutoreleased: 422,
      CXCursor_NSConsumesSelf: 423,
      CXCursor_NSConsumed: 424,
      CXCursor_ObjCException: 425,
      CXCursor_ObjCNSObject: 426,
      CXCursor_ObjCIndependentClass: 427,
      CXCursor_ObjCPreciseLifetime: 428,
      CXCursor_ObjCReturnsInnerPointer: 429,
      CXCursor_ObjCRequiresSuper: 430,
      CXCursor_ObjCRootClass: 431,
      CXCursor_ObjCSubclassingRestricted: 432,
      CXCursor_ObjCExplicitProtocolImpl: 433,
      CXCursor_ObjCDesignatedInitializer: 434,
      CXCursor_ObjCRuntimeVisible: 435,
      CXCursor_ObjCBoxable: 436,
      CXCursor_FlagEnum: 437,
      CXCursor_ConvergentAttr: 438,
      CXCursor_WarnUnusedAttr: 439,
      CXCursor_WarnUnusedResultAttr: 440,
      CXCursor_AlignedAttr: 441,
      CXCursor_LastAttr: 441,
      CXCursor_PreprocessingDirective: 500,
      CXCursor_MacroDefinition: 501,
      CXCursor_MacroExpansion: 502,
      CXCursor_MacroInstantiation: 502,
      CXCursor_InclusionDirective: 503,
      CXCursor_FirstPreprocessing: 500,
      CXCursor_LastPreprocessing: 503,
      CXCursor_ModuleImportDecl: 600,
      CXCursor_TypeAliasTemplateDecl: 601,
      CXCursor_StaticAssert: 602,
      CXCursor_FriendDecl: 603,
      CXCursor_FirstExtraDecl: 600,
      CXCursor_LastExtraDecl: 603,
      CXCursor_OverloadCandidate: 700,
      "1": "CXCursor_UnexposedDecl",
      "2": "CXCursor_StructDecl",
      "3": "CXCursor_UnionDecl",
      "4": "CXCursor_ClassDecl",
      "5": "CXCursor_EnumDecl",
      "6": "CXCursor_FieldDecl",
      "7": "CXCursor_EnumConstantDecl",
      "8": "CXCursor_FunctionDecl",
      "9": "CXCursor_VarDecl",
      "10": "CXCursor_ParmDecl",
      "11": "CXCursor_ObjCInterfaceDecl",
      "12": "CXCursor_ObjCCategoryDecl",
      "13": "CXCursor_ObjCProtocolDecl",
      "14": "CXCursor_ObjCPropertyDecl",
      "15": "CXCursor_ObjCIvarDecl",
      "16": "CXCursor_ObjCInstanceMethodDecl",
      "17": "CXCursor_ObjCClassMethodDecl",
      "18": "CXCursor_ObjCImplementationDecl",
      "19": "CXCursor_ObjCCategoryImplDecl",
      "20": "CXCursor_TypedefDecl",
      "21": "CXCursor_CXXMethod",
      "22": "CXCursor_Namespace",
      "23": "CXCursor_LinkageSpec",
      "24": "CXCursor_Constructor",
      "25": "CXCursor_Destructor",
      "26": "CXCursor_ConversionFunction",
      "27": "CXCursor_TemplateTypeParameter",
      "28": "CXCursor_NonTypeTemplateParameter",
      "29": "CXCursor_TemplateTemplateParameter",
      "30": "CXCursor_FunctionTemplate",
      "31": "CXCursor_ClassTemplate",
      "32": "CXCursor_ClassTemplatePartialSpecialization",
      "33": "CXCursor_NamespaceAlias",
      "34": "CXCursor_UsingDirective",
      "35": "CXCursor_UsingDeclaration",
      "36": "CXCursor_TypeAliasDecl",
      "37": "CXCursor_ObjCSynthesizeDecl",
      "38": "CXCursor_ObjCDynamicDecl",
      "39": "CXCursor_CXXAccessSpecifier",
      "1": "CXCursor_FirstDecl",
      "39": "CXCursor_LastDecl",
      "40": "CXCursor_FirstRef",
      "40": "CXCursor_ObjCSuperClassRef",
      "41": "CXCursor_ObjCProtocolRef",
      "42": "CXCursor_ObjCClassRef",
      "43": "CXCursor_TypeRef",
      "44": "CXCursor_CXXBaseSpecifier",
      "45": "CXCursor_TemplateRef",
      "46": "CXCursor_NamespaceRef",
      "47": "CXCursor_MemberRef",
      "48": "CXCursor_LabelRef",
      "49": "CXCursor_OverloadedDeclRef",
      "50": "CXCursor_VariableRef",
      "50": "CXCursor_LastRef",
      "70": "CXCursor_FirstInvalid",
      "70": "CXCursor_InvalidFile",
      "71": "CXCursor_NoDeclFound",
      "72": "CXCursor_NotImplemented",
      "73": "CXCursor_InvalidCode",
      "73": "CXCursor_LastInvalid",
      "100": "CXCursor_FirstExpr",
      "100": "CXCursor_UnexposedExpr",
      "101": "CXCursor_DeclRefExpr",
      "102": "CXCursor_MemberRefExpr",
      "103": "CXCursor_CallExpr",
      "104": "CXCursor_ObjCMessageExpr",
      "105": "CXCursor_BlockExpr",
      "106": "CXCursor_IntegerLiteral",
      "107": "CXCursor_FloatingLiteral",
      "108": "CXCursor_ImaginaryLiteral",
      "109": "CXCursor_StringLiteral",
      "110": "CXCursor_CharacterLiteral",
      "111": "CXCursor_ParenExpr",
      "112": "CXCursor_UnaryOperator",
      "113": "CXCursor_ArraySubscriptExpr",
      "114": "CXCursor_BinaryOperator",
      "115": "CXCursor_CompoundAssignOperator",
      "116": "CXCursor_ConditionalOperator",
      "117": "CXCursor_CStyleCastExpr",
      "118": "CXCursor_CompoundLiteralExpr",
      "119": "CXCursor_InitListExpr",
      "120": "CXCursor_AddrLabelExpr",
      "121": "CXCursor_StmtExpr",
      "122": "CXCursor_GenericSelectionExpr",
      "123": "CXCursor_GNUNullExpr",
      "124": "CXCursor_CXXStaticCastExpr",
      "125": "CXCursor_CXXDynamicCastExpr",
      "126": "CXCursor_CXXReinterpretCastExpr",
      "127": "CXCursor_CXXConstCastExpr",
      "128": "CXCursor_CXXFunctionalCastExpr",
      "129": "CXCursor_CXXTypeidExpr",
      "130": "CXCursor_CXXBoolLiteralExpr",
      "131": "CXCursor_CXXNullPtrLiteralExpr",
      "132": "CXCursor_CXXThisExpr",
      "133": "CXCursor_CXXThrowExpr",
      "134": "CXCursor_CXXNewExpr",
      "135": "CXCursor_CXXDeleteExpr",
      "136": "CXCursor_UnaryExpr",
      "137": "CXCursor_ObjCStringLiteral",
      "138": "CXCursor_ObjCEncodeExpr",
      "139": "CXCursor_ObjCSelectorExpr",
      "140": "CXCursor_ObjCProtocolExpr",
      "141": "CXCursor_ObjCBridgedCastExpr",
      "142": "CXCursor_PackExpansionExpr",
      "143": "CXCursor_SizeOfPackExpr",
      "144": "CXCursor_LambdaExpr",
      "145": "CXCursor_ObjCBoolLiteralExpr",
      "146": "CXCursor_ObjCSelfExpr",
      "147": "CXCursor_OMPArraySectionExpr",
      "148": "CXCursor_ObjCAvailabilityCheckExpr",
      "149": "CXCursor_FixedPointLiteral",
      "150": "CXCursor_OMPArrayShapingExpr",
      "151": "CXCursor_OMPIteratorExpr",
      "152": "CXCursor_CXXAddrspaceCastExpr",
      "152": "CXCursor_LastExpr",
      "200": "CXCursor_FirstStmt",
      "200": "CXCursor_UnexposedStmt",
      "201": "CXCursor_LabelStmt",
      "202": "CXCursor_CompoundStmt",
      "203": "CXCursor_CaseStmt",
      "204": "CXCursor_DefaultStmt",
      "205": "CXCursor_IfStmt",
      "206": "CXCursor_SwitchStmt",
      "207": "CXCursor_WhileStmt",
      "208": "CXCursor_DoStmt",
      "209": "CXCursor_ForStmt",
      "210": "CXCursor_GotoStmt",
      "211": "CXCursor_IndirectGotoStmt",
      "212": "CXCursor_ContinueStmt",
      "213": "CXCursor_BreakStmt",
      "214": "CXCursor_ReturnStmt",
      "215": "CXCursor_GCCAsmStmt",
      "215": "CXCursor_AsmStmt",
      "216": "CXCursor_ObjCAtTryStmt",
      "217": "CXCursor_ObjCAtCatchStmt",
      "218": "CXCursor_ObjCAtFinallyStmt",
      "219": "CXCursor_ObjCAtThrowStmt",
      "220": "CXCursor_ObjCAtSynchronizedStmt",
      "221": "CXCursor_ObjCAutoreleasePoolStmt",
      "222": "CXCursor_ObjCForCollectionStmt",
      "223": "CXCursor_CXXCatchStmt",
      "224": "CXCursor_CXXTryStmt",
      "225": "CXCursor_CXXForRangeStmt",
      "226": "CXCursor_SEHTryStmt",
      "227": "CXCursor_SEHExceptStmt",
      "228": "CXCursor_SEHFinallyStmt",
      "229": "CXCursor_MSAsmStmt",
      "230": "CXCursor_NullStmt",
      "231": "CXCursor_DeclStmt",
      "232": "CXCursor_OMPParallelDirective",
      "233": "CXCursor_OMPSimdDirective",
      "234": "CXCursor_OMPForDirective",
      "235": "CXCursor_OMPSectionsDirective",
      "236": "CXCursor_OMPSectionDirective",
      "237": "CXCursor_OMPSingleDirective",
      "238": "CXCursor_OMPParallelForDirective",
      "239": "CXCursor_OMPParallelSectionsDirective",
      "240": "CXCursor_OMPTaskDirective",
      "241": "CXCursor_OMPMasterDirective",
      "242": "CXCursor_OMPCriticalDirective",
      "243": "CXCursor_OMPTaskyieldDirective",
      "244": "CXCursor_OMPBarrierDirective",
      "245": "CXCursor_OMPTaskwaitDirective",
      "246": "CXCursor_OMPFlushDirective",
      "247": "CXCursor_SEHLeaveStmt",
      "248": "CXCursor_OMPOrderedDirective",
      "249": "CXCursor_OMPAtomicDirective",
      "250": "CXCursor_OMPForSimdDirective",
      "251": "CXCursor_OMPParallelForSimdDirective",
      "252": "CXCursor_OMPTargetDirective",
      "253": "CXCursor_OMPTeamsDirective",
      "254": "CXCursor_OMPTaskgroupDirective",
      "255": "CXCursor_OMPCancellationPointDirective",
      "256": "CXCursor_OMPCancelDirective",
      "257": "CXCursor_OMPTargetDataDirective",
      "258": "CXCursor_OMPTaskLoopDirective",
      "259": "CXCursor_OMPTaskLoopSimdDirective",
      "260": "CXCursor_OMPDistributeDirective",
      "261": "CXCursor_OMPTargetEnterDataDirective",
      "262": "CXCursor_OMPTargetExitDataDirective",
      "263": "CXCursor_OMPTargetParallelDirective",
      "264": "CXCursor_OMPTargetParallelForDirective",
      "265": "CXCursor_OMPTargetUpdateDirective",
      "266": "CXCursor_OMPDistributeParallelForDirective",
      "267": "CXCursor_OMPDistributeParallelForSimdDirective",
      "268": "CXCursor_OMPDistributeSimdDirective",
      "269": "CXCursor_OMPTargetParallelForSimdDirective",
      "270": "CXCursor_OMPTargetSimdDirective",
      "271": "CXCursor_OMPTeamsDistributeDirective",
      "272": "CXCursor_OMPTeamsDistributeSimdDirective",
      "273": "CXCursor_OMPTeamsDistributeParallelForSimdDirective",
      "274": "CXCursor_OMPTeamsDistributeParallelForDirective",
      "275": "CXCursor_OMPTargetTeamsDirective",
      "276": "CXCursor_OMPTargetTeamsDistributeDirective",
      "277": "CXCursor_OMPTargetTeamsDistributeParallelForDirective",
      "278": "CXCursor_OMPTargetTeamsDistributeParallelForSimdDirective",
      "279": "CXCursor_OMPTargetTeamsDistributeSimdDirective",
      "280": "CXCursor_BuiltinBitCastExpr",
      "281": "CXCursor_OMPMasterTaskLoopDirective",
      "282": "CXCursor_OMPParallelMasterTaskLoopDirective",
      "283": "CXCursor_OMPMasterTaskLoopSimdDirective",
      "284": "CXCursor_OMPParallelMasterTaskLoopSimdDirective",
      "285": "CXCursor_OMPParallelMasterDirective",
      "286": "CXCursor_OMPDepobjDirective",
      "287": "CXCursor_OMPScanDirective",
      "287": "CXCursor_LastStmt",
      "300": "CXCursor_TranslationUnit",
      "400": "CXCursor_FirstAttr",
      "400": "CXCursor_UnexposedAttr",
      "401": "CXCursor_IBActionAttr",
      "402": "CXCursor_IBOutletAttr",
      "403": "CXCursor_IBOutletCollectionAttr",
      "404": "CXCursor_CXXFinalAttr",
      "405": "CXCursor_CXXOverrideAttr",
      "406": "CXCursor_AnnotateAttr",
      "407": "CXCursor_AsmLabelAttr",
      "408": "CXCursor_PackedAttr",
      "409": "CXCursor_PureAttr",
      "410": "CXCursor_ConstAttr",
      "411": "CXCursor_NoDuplicateAttr",
      "412": "CXCursor_CUDAConstantAttr",
      "413": "CXCursor_CUDADeviceAttr",
      "414": "CXCursor_CUDAGlobalAttr",
      "415": "CXCursor_CUDAHostAttr",
      "416": "CXCursor_CUDASharedAttr",
      "417": "CXCursor_VisibilityAttr",
      "418": "CXCursor_DLLExport",
      "419": "CXCursor_DLLImport",
      "420": "CXCursor_NSReturnsRetained",
      "421": "CXCursor_NSReturnsNotRetained",
      "422": "CXCursor_NSReturnsAutoreleased",
      "423": "CXCursor_NSConsumesSelf",
      "424": "CXCursor_NSConsumed",
      "425": "CXCursor_ObjCException",
      "426": "CXCursor_ObjCNSObject",
      "427": "CXCursor_ObjCIndependentClass",
      "428": "CXCursor_ObjCPreciseLifetime",
      "429": "CXCursor_ObjCReturnsInnerPointer",
      "430": "CXCursor_ObjCRequiresSuper",
      "431": "CXCursor_ObjCRootClass",
      "432": "CXCursor_ObjCSubclassingRestricted",
      "433": "CXCursor_ObjCExplicitProtocolImpl",
      "434": "CXCursor_ObjCDesignatedInitializer",
      "435": "CXCursor_ObjCRuntimeVisible",
      "436": "CXCursor_ObjCBoxable",
      "437": "CXCursor_FlagEnum",
      "438": "CXCursor_ConvergentAttr",
      "439": "CXCursor_WarnUnusedAttr",
      "440": "CXCursor_WarnUnusedResultAttr",
      "441": "CXCursor_AlignedAttr",
      "441": "CXCursor_LastAttr",
      "500": "CXCursor_PreprocessingDirective",
      "501": "CXCursor_MacroDefinition",
      "502": "CXCursor_MacroExpansion",
      "502": "CXCursor_MacroInstantiation",
      "503": "CXCursor_InclusionDirective",
      "500": "CXCursor_FirstPreprocessing",
      "503": "CXCursor_LastPreprocessing",
      "600": "CXCursor_ModuleImportDecl",
      "601": "CXCursor_TypeAliasTemplateDecl",
      "602": "CXCursor_StaticAssert",
      "603": "CXCursor_FriendDecl",
      "600": "CXCursor_FirstExtraDecl",
      "603": "CXCursor_LastExtraDecl",
      "700": "CXCursor_OverloadCandidate",
  },
  "CXCursor_ExceptionSpecificationKind": {
      CXCursor_ExceptionSpecificationKind_None: 0,
      CXCursor_ExceptionSpecificationKind_DynamicNone: 1,
      CXCursor_ExceptionSpecificationKind_Dynamic: 2,
      CXCursor_ExceptionSpecificationKind_MSAny: 3,
      CXCursor_ExceptionSpecificationKind_BasicNoexcept: 4,
      CXCursor_ExceptionSpecificationKind_ComputedNoexcept: 5,
      CXCursor_ExceptionSpecificationKind_Unevaluated: 6,
      CXCursor_ExceptionSpecificationKind_Uninstantiated: 7,
      CXCursor_ExceptionSpecificationKind_Unparsed: 8,
      CXCursor_ExceptionSpecificationKind_NoThrow: 9,
      "0": "CXCursor_ExceptionSpecificationKind_None",
      "1": "CXCursor_ExceptionSpecificationKind_DynamicNone",
      "2": "CXCursor_ExceptionSpecificationKind_Dynamic",
      "3": "CXCursor_ExceptionSpecificationKind_MSAny",
      "4": "CXCursor_ExceptionSpecificationKind_BasicNoexcept",
      "5": "CXCursor_ExceptionSpecificationKind_ComputedNoexcept",
      "6": "CXCursor_ExceptionSpecificationKind_Unevaluated",
      "7": "CXCursor_ExceptionSpecificationKind_Uninstantiated",
      "8": "CXCursor_ExceptionSpecificationKind_Unparsed",
      "9": "CXCursor_ExceptionSpecificationKind_NoThrow",
  },
  "CXDiagnosticDisplayOptions": {
      CXDiagnostic_DisplaySourceLocation: 1,
      CXDiagnostic_DisplayColumn: 2,
      CXDiagnostic_DisplaySourceRanges: 4,
      CXDiagnostic_DisplayOption: 8,
      CXDiagnostic_DisplayCategoryId: 16,
      CXDiagnostic_DisplayCategoryName: 32,
      "1": "CXDiagnostic_DisplaySourceLocation",
      "2": "CXDiagnostic_DisplayColumn",
      "4": "CXDiagnostic_DisplaySourceRanges",
      "8": "CXDiagnostic_DisplayOption",
      "16": "CXDiagnostic_DisplayCategoryId",
      "32": "CXDiagnostic_DisplayCategoryName",
  },
  "CXDiagnosticSeverity": {
      CXDiagnostic_Ignored: 0,
      CXDiagnostic_Note: 1,
      CXDiagnostic_Warning: 2,
      CXDiagnostic_Error: 3,
      CXDiagnostic_Fatal: 4,
      "0": "CXDiagnostic_Ignored",
      "1": "CXDiagnostic_Note",
      "2": "CXDiagnostic_Warning",
      "3": "CXDiagnostic_Error",
      "4": "CXDiagnostic_Fatal",
  },
  "CXErrorCode": {
      CXError_Success: 0,
      CXError_Failure: 1,
      CXError_Crashed: 2,
      CXError_InvalidArguments: 3,
      CXError_ASTReadError: 4,
      "0": "CXError_Success",
      "1": "CXError_Failure",
      "2": "CXError_Crashed",
      "3": "CXError_InvalidArguments",
      "4": "CXError_ASTReadError",
  },
  "CXEvalResultKind": {
      CXEval_Int: 1,
      CXEval_Float: 2,
      CXEval_ObjCStrLiteral: 3,
      CXEval_StrLiteral: 4,
      CXEval_CFStr: 5,
      CXEval_Other: 6,
      CXEval_UnExposed: 0,
      "1": "CXEval_Int",
      "2": "CXEval_Float",
      "3": "CXEval_ObjCStrLiteral",
      "4": "CXEval_StrLiteral",
      "5": "CXEval_CFStr",
      "6": "CXEval_Other",
      "0": "CXEval_UnExposed",
  },
  "CXIdxAttrKind": {
      CXIdxAttr_Unexposed: 0,
      CXIdxAttr_IBAction: 1,
      CXIdxAttr_IBOutlet: 2,
      CXIdxAttr_IBOutletCollection: 3,
      "0": "CXIdxAttr_Unexposed",
      "1": "CXIdxAttr_IBAction",
      "2": "CXIdxAttr_IBOutlet",
      "3": "CXIdxAttr_IBOutletCollection",
  },
  "CXIdxEntityCXXTemplateKind": {
      CXIdxEntity_NonTemplate: 0,
      CXIdxEntity_Template: 1,
      CXIdxEntity_TemplatePartialSpecialization: 2,
      CXIdxEntity_TemplateSpecialization: 3,
      "0": "CXIdxEntity_NonTemplate",
      "1": "CXIdxEntity_Template",
      "2": "CXIdxEntity_TemplatePartialSpecialization",
      "3": "CXIdxEntity_TemplateSpecialization",
  },
  "CXIdxEntityKind": {
      CXIdxEntity_Unexposed: 0,
      CXIdxEntity_Typedef: 1,
      CXIdxEntity_Function: 2,
      CXIdxEntity_Variable: 3,
      CXIdxEntity_Field: 4,
      CXIdxEntity_EnumConstant: 5,
      CXIdxEntity_ObjCClass: 6,
      CXIdxEntity_ObjCProtocol: 7,
      CXIdxEntity_ObjCCategory: 8,
      CXIdxEntity_ObjCInstanceMethod: 9,
      CXIdxEntity_ObjCClassMethod: 10,
      CXIdxEntity_ObjCProperty: 11,
      CXIdxEntity_ObjCIvar: 12,
      CXIdxEntity_Enum: 13,
      CXIdxEntity_Struct: 14,
      CXIdxEntity_Union: 15,
      CXIdxEntity_CXXClass: 16,
      CXIdxEntity_CXXNamespace: 17,
      CXIdxEntity_CXXNamespaceAlias: 18,
      CXIdxEntity_CXXStaticVariable: 19,
      CXIdxEntity_CXXStaticMethod: 20,
      CXIdxEntity_CXXInstanceMethod: 21,
      CXIdxEntity_CXXConstructor: 22,
      CXIdxEntity_CXXDestructor: 23,
      CXIdxEntity_CXXConversionFunction: 24,
      CXIdxEntity_CXXTypeAlias: 25,
      CXIdxEntity_CXXInterface: 26,
      "0": "CXIdxEntity_Unexposed",
      "1": "CXIdxEntity_Typedef",
      "2": "CXIdxEntity_Function",
      "3": "CXIdxEntity_Variable",
      "4": "CXIdxEntity_Field",
      "5": "CXIdxEntity_EnumConstant",
      "6": "CXIdxEntity_ObjCClass",
      "7": "CXIdxEntity_ObjCProtocol",
      "8": "CXIdxEntity_ObjCCategory",
      "9": "CXIdxEntity_ObjCInstanceMethod",
      "10": "CXIdxEntity_ObjCClassMethod",
      "11": "CXIdxEntity_ObjCProperty",
      "12": "CXIdxEntity_ObjCIvar",
      "13": "CXIdxEntity_Enum",
      "14": "CXIdxEntity_Struct",
      "15": "CXIdxEntity_Union",
      "16": "CXIdxEntity_CXXClass",
      "17": "CXIdxEntity_CXXNamespace",
      "18": "CXIdxEntity_CXXNamespaceAlias",
      "19": "CXIdxEntity_CXXStaticVariable",
      "20": "CXIdxEntity_CXXStaticMethod",
      "21": "CXIdxEntity_CXXInstanceMethod",
      "22": "CXIdxEntity_CXXConstructor",
      "23": "CXIdxEntity_CXXDestructor",
      "24": "CXIdxEntity_CXXConversionFunction",
      "25": "CXIdxEntity_CXXTypeAlias",
      "26": "CXIdxEntity_CXXInterface",
  },
  "CXIdxEntityLanguage": {
      CXIdxEntityLang_None: 0,
      CXIdxEntityLang_C: 1,
      CXIdxEntityLang_ObjC: 2,
      CXIdxEntityLang_CXX: 3,
      CXIdxEntityLang_Swift: 4,
      "0": "CXIdxEntityLang_None",
      "1": "CXIdxEntityLang_C",
      "2": "CXIdxEntityLang_ObjC",
      "3": "CXIdxEntityLang_CXX",
      "4": "CXIdxEntityLang_Swift",
  },
  "CXIdxEntityRefKind": {
      CXIdxEntityRef_Direct: 1,
      CXIdxEntityRef_Implicit: 2,
      "1": "CXIdxEntityRef_Direct",
      "2": "CXIdxEntityRef_Implicit",
  },
  "CXIdxObjCContainerKind": {
      CXIdxObjCContainer_ForwardRef: 0,
      CXIdxObjCContainer_Interface: 1,
      CXIdxObjCContainer_Implementation: 2,
      "0": "CXIdxObjCContainer_ForwardRef",
      "1": "CXIdxObjCContainer_Interface",
      "2": "CXIdxObjCContainer_Implementation",
  },
  "CXLanguageKind": {
      CXLanguage_Invalid: 0,
      CXLanguage_C: 1,
      CXLanguage_ObjC: 2,
      CXLanguage_CPlusPlus: 3,
      "0": "CXLanguage_Invalid",
      "1": "CXLanguage_C",
      "2": "CXLanguage_ObjC",
      "3": "CXLanguage_CPlusPlus",
  },
  "CXLinkageKind": {
      CXLinkage_Invalid: 0,
      CXLinkage_NoLinkage: 1,
      CXLinkage_Internal: 2,
      CXLinkage_UniqueExternal: 3,
      CXLinkage_External: 4,
      "0": "CXLinkage_Invalid",
      "1": "CXLinkage_NoLinkage",
      "2": "CXLinkage_Internal",
      "3": "CXLinkage_UniqueExternal",
      "4": "CXLinkage_External",
  },
  "CXLoadDiag_Error": {
      CXLoadDiag_None: 0,
      CXLoadDiag_Unknown: 1,
      CXLoadDiag_CannotLoad: 2,
      CXLoadDiag_InvalidFile: 3,
      "0": "CXLoadDiag_None",
      "1": "CXLoadDiag_Unknown",
      "2": "CXLoadDiag_CannotLoad",
      "3": "CXLoadDiag_InvalidFile",
  },
  "CXNameRefFlags": {
      CXNameRange_WantQualifier: 1,
      CXNameRange_WantTemplateArgs: 2,
      CXNameRange_WantSinglePiece: 4,
      "1": "CXNameRange_WantQualifier",
      "2": "CXNameRange_WantTemplateArgs",
      "4": "CXNameRange_WantSinglePiece",
  },
  "CXPrintingPolicyProperty": {
      CXPrintingPolicy_Indentation: 0,
      CXPrintingPolicy_SuppressSpecifiers: 1,
      CXPrintingPolicy_SuppressTagKeyword: 2,
      CXPrintingPolicy_IncludeTagDefinition: 3,
      CXPrintingPolicy_SuppressScope: 4,
      CXPrintingPolicy_SuppressUnwrittenScope: 5,
      CXPrintingPolicy_SuppressInitializers: 6,
      CXPrintingPolicy_ConstantArraySizeAsWritten: 7,
      CXPrintingPolicy_AnonymousTagLocations: 8,
      CXPrintingPolicy_SuppressStrongLifetime: 9,
      CXPrintingPolicy_SuppressLifetimeQualifiers: 10,
      CXPrintingPolicy_SuppressTemplateArgsInCXXConstructors: 11,
      CXPrintingPolicy_Bool: 12,
      CXPrintingPolicy_Restrict: 13,
      CXPrintingPolicy_Alignof: 14,
      CXPrintingPolicy_UnderscoreAlignof: 15,
      CXPrintingPolicy_UseVoidForZeroParams: 16,
      CXPrintingPolicy_TerseOutput: 17,
      CXPrintingPolicy_PolishForDeclaration: 18,
      CXPrintingPolicy_Half: 19,
      CXPrintingPolicy_MSWChar: 20,
      CXPrintingPolicy_IncludeNewlines: 21,
      CXPrintingPolicy_MSVCFormatting: 22,
      CXPrintingPolicy_ConstantsAsWritten: 23,
      CXPrintingPolicy_SuppressImplicitBase: 24,
      CXPrintingPolicy_FullyQualifiedName: 25,
      CXPrintingPolicy_LastProperty: 25,
      "0": "CXPrintingPolicy_Indentation",
      "1": "CXPrintingPolicy_SuppressSpecifiers",
      "2": "CXPrintingPolicy_SuppressTagKeyword",
      "3": "CXPrintingPolicy_IncludeTagDefinition",
      "4": "CXPrintingPolicy_SuppressScope",
      "5": "CXPrintingPolicy_SuppressUnwrittenScope",
      "6": "CXPrintingPolicy_SuppressInitializers",
      "7": "CXPrintingPolicy_ConstantArraySizeAsWritten",
      "8": "CXPrintingPolicy_AnonymousTagLocations",
      "9": "CXPrintingPolicy_SuppressStrongLifetime",
      "10": "CXPrintingPolicy_SuppressLifetimeQualifiers",
      "11": "CXPrintingPolicy_SuppressTemplateArgsInCXXConstructors",
      "12": "CXPrintingPolicy_Bool",
      "13": "CXPrintingPolicy_Restrict",
      "14": "CXPrintingPolicy_Alignof",
      "15": "CXPrintingPolicy_UnderscoreAlignof",
      "16": "CXPrintingPolicy_UseVoidForZeroParams",
      "17": "CXPrintingPolicy_TerseOutput",
      "18": "CXPrintingPolicy_PolishForDeclaration",
      "19": "CXPrintingPolicy_Half",
      "20": "CXPrintingPolicy_MSWChar",
      "21": "CXPrintingPolicy_IncludeNewlines",
      "22": "CXPrintingPolicy_MSVCFormatting",
      "23": "CXPrintingPolicy_ConstantsAsWritten",
      "24": "CXPrintingPolicy_SuppressImplicitBase",
      "25": "CXPrintingPolicy_FullyQualifiedName",
      "25": "CXPrintingPolicy_LastProperty",
  },
  "CXRefQualifierKind": {
      CXRefQualifier_None: 0,
      CXRefQualifier_LValue: 1,
      CXRefQualifier_RValue: 2,
      "0": "CXRefQualifier_None",
      "1": "CXRefQualifier_LValue",
      "2": "CXRefQualifier_RValue",
  },
  "CXReparse_Flags": {
      CXReparse_None: 0,
      "0": "CXReparse_None",
  },
  "CXResult": {
      CXResult_Success: 0,
      CXResult_Invalid: 1,
      CXResult_VisitBreak: 2,
      "0": "CXResult_Success",
      "1": "CXResult_Invalid",
      "2": "CXResult_VisitBreak",
  },
  "CXSaveError": {
      CXSaveError_None: 0,
      CXSaveError_Unknown: 1,
      CXSaveError_TranslationErrors: 2,
      CXSaveError_InvalidTU: 3,
      "0": "CXSaveError_None",
      "1": "CXSaveError_Unknown",
      "2": "CXSaveError_TranslationErrors",
      "3": "CXSaveError_InvalidTU",
  },
  "CXSaveTranslationUnit_Flags": {
      CXSaveTranslationUnit_None: 0,
      "0": "CXSaveTranslationUnit_None",
  },
  "CXSymbolRole": {
      CXSymbolRole_None: 0,
      CXSymbolRole_Declaration: 1,
      CXSymbolRole_Definition: 2,
      CXSymbolRole_Reference: 4,
      CXSymbolRole_Read: 8,
      CXSymbolRole_Write: 16,
      CXSymbolRole_Call: 32,
      CXSymbolRole_Dynamic: 64,
      CXSymbolRole_AddressOf: 128,
      CXSymbolRole_Implicit: 256,
      "0": "CXSymbolRole_None",
      "1": "CXSymbolRole_Declaration",
      "2": "CXSymbolRole_Definition",
      "4": "CXSymbolRole_Reference",
      "8": "CXSymbolRole_Read",
      "16": "CXSymbolRole_Write",
      "32": "CXSymbolRole_Call",
      "64": "CXSymbolRole_Dynamic",
      "128": "CXSymbolRole_AddressOf",
      "256": "CXSymbolRole_Implicit",
  },
  "CXTLSKind": {
      CXTLS_None: 0,
      CXTLS_Dynamic: 1,
      CXTLS_Static: 2,
      "0": "CXTLS_None",
      "1": "CXTLS_Dynamic",
      "2": "CXTLS_Static",
  },
  "CXTUResourceUsageKind": {
      CXTUResourceUsage_AST: 1,
      CXTUResourceUsage_Identifiers: 2,
      CXTUResourceUsage_Selectors: 3,
      CXTUResourceUsage_GlobalCompletionResults: 4,
      CXTUResourceUsage_SourceManagerContentCache: 5,
      CXTUResourceUsage_AST_SideTables: 6,
      CXTUResourceUsage_SourceManager_Membuffer_Malloc: 7,
      CXTUResourceUsage_SourceManager_Membuffer_MMap: 8,
      CXTUResourceUsage_ExternalASTSource_Membuffer_Malloc: 9,
      CXTUResourceUsage_ExternalASTSource_Membuffer_MMap: 10,
      CXTUResourceUsage_Preprocessor: 11,
      CXTUResourceUsage_PreprocessingRecord: 12,
      CXTUResourceUsage_SourceManager_DataStructures: 13,
      CXTUResourceUsage_Preprocessor_HeaderSearch: 14,
      CXTUResourceUsage_MEMORY_IN_BYTES_BEGIN: 1,
      CXTUResourceUsage_MEMORY_IN_BYTES_END: 14,
      CXTUResourceUsage_First: 1,
      CXTUResourceUsage_Last: 14,
      "1": "CXTUResourceUsage_AST",
      "2": "CXTUResourceUsage_Identifiers",
      "3": "CXTUResourceUsage_Selectors",
      "4": "CXTUResourceUsage_GlobalCompletionResults",
      "5": "CXTUResourceUsage_SourceManagerContentCache",
      "6": "CXTUResourceUsage_AST_SideTables",
      "7": "CXTUResourceUsage_SourceManager_Membuffer_Malloc",
      "8": "CXTUResourceUsage_SourceManager_Membuffer_MMap",
      "9": "CXTUResourceUsage_ExternalASTSource_Membuffer_Malloc",
      "10": "CXTUResourceUsage_ExternalASTSource_Membuffer_MMap",
      "11": "CXTUResourceUsage_Preprocessor",
      "12": "CXTUResourceUsage_PreprocessingRecord",
      "13": "CXTUResourceUsage_SourceManager_DataStructures",
      "14": "CXTUResourceUsage_Preprocessor_HeaderSearch",
      "1": "CXTUResourceUsage_MEMORY_IN_BYTES_BEGIN",
      "14": "CXTUResourceUsage_MEMORY_IN_BYTES_END",
      "1": "CXTUResourceUsage_First",
      "14": "CXTUResourceUsage_Last",
  },
  "CXTemplateArgumentKind": {
      CXTemplateArgumentKind_Null: 0,
      CXTemplateArgumentKind_Type: 1,
      CXTemplateArgumentKind_Declaration: 2,
      CXTemplateArgumentKind_NullPtr: 3,
      CXTemplateArgumentKind_Integral: 4,
      CXTemplateArgumentKind_Template: 5,
      CXTemplateArgumentKind_TemplateExpansion: 6,
      CXTemplateArgumentKind_Expression: 7,
      CXTemplateArgumentKind_Pack: 8,
      CXTemplateArgumentKind_Invalid: 9,
      "0": "CXTemplateArgumentKind_Null",
      "1": "CXTemplateArgumentKind_Type",
      "2": "CXTemplateArgumentKind_Declaration",
      "3": "CXTemplateArgumentKind_NullPtr",
      "4": "CXTemplateArgumentKind_Integral",
      "5": "CXTemplateArgumentKind_Template",
      "6": "CXTemplateArgumentKind_TemplateExpansion",
      "7": "CXTemplateArgumentKind_Expression",
      "8": "CXTemplateArgumentKind_Pack",
      "9": "CXTemplateArgumentKind_Invalid",
  },
  "CXTokenKind": {
      CXToken_Punctuation: 0,
      CXToken_Keyword: 1,
      CXToken_Identifier: 2,
      CXToken_Literal: 3,
      CXToken_Comment: 4,
      "0": "CXToken_Punctuation",
      "1": "CXToken_Keyword",
      "2": "CXToken_Identifier",
      "3": "CXToken_Literal",
      "4": "CXToken_Comment",
  },
  "CXTranslationUnit_Flags": {
      CXTranslationUnit_None: 0,
      CXTranslationUnit_DetailedPreprocessingRecord: 1,
      CXTranslationUnit_Incomplete: 2,
      CXTranslationUnit_PrecompiledPreamble: 4,
      CXTranslationUnit_CacheCompletionResults: 8,
      CXTranslationUnit_ForSerialization: 16,
      CXTranslationUnit_CXXChainedPCH: 32,
      CXTranslationUnit_SkipFunctionBodies: 64,
      CXTranslationUnit_IncludeBriefCommentsInCodeCompletion: 128,
      CXTranslationUnit_CreatePreambleOnFirstParse: 256,
      CXTranslationUnit_KeepGoing: 512,
      CXTranslationUnit_SingleFileParse: 1024,
      CXTranslationUnit_LimitSkipFunctionBodiesToPreamble: 2048,
      CXTranslationUnit_IncludeAttributedTypes: 4096,
      CXTranslationUnit_VisitImplicitAttributes: 8192,
      CXTranslationUnit_IgnoreNonErrorsFromIncludedFiles: 16384,
      CXTranslationUnit_RetainExcludedConditionalBlocks: 32768,
      "0": "CXTranslationUnit_None",
      "1": "CXTranslationUnit_DetailedPreprocessingRecord",
      "2": "CXTranslationUnit_Incomplete",
      "4": "CXTranslationUnit_PrecompiledPreamble",
      "8": "CXTranslationUnit_CacheCompletionResults",
      "16": "CXTranslationUnit_ForSerialization",
      "32": "CXTranslationUnit_CXXChainedPCH",
      "64": "CXTranslationUnit_SkipFunctionBodies",
      "128": "CXTranslationUnit_IncludeBriefCommentsInCodeCompletion",
      "256": "CXTranslationUnit_CreatePreambleOnFirstParse",
      "512": "CXTranslationUnit_KeepGoing",
      "1024": "CXTranslationUnit_SingleFileParse",
      "2048": "CXTranslationUnit_LimitSkipFunctionBodiesToPreamble",
      "4096": "CXTranslationUnit_IncludeAttributedTypes",
      "8192": "CXTranslationUnit_VisitImplicitAttributes",
      "16384": "CXTranslationUnit_IgnoreNonErrorsFromIncludedFiles",
      "32768": "CXTranslationUnit_RetainExcludedConditionalBlocks",
  },
  "CXTypeKind": {
      CXType_Invalid: 0,
      CXType_Unexposed: 1,
      CXType_Void: 2,
      CXType_Bool: 3,
      CXType_Char_U: 4,
      CXType_UChar: 5,
      CXType_Char16: 6,
      CXType_Char32: 7,
      CXType_UShort: 8,
      CXType_UInt: 9,
      CXType_ULong: 10,
      CXType_ULongLong: 11,
      CXType_UInt128: 12,
      CXType_Char_S: 13,
      CXType_SChar: 14,
      CXType_WChar: 15,
      CXType_Short: 16,
      CXType_Int: 17,
      CXType_Long: 18,
      CXType_LongLong: 19,
      CXType_Int128: 20,
      CXType_Float: 21,
      CXType_Double: 22,
      CXType_LongDouble: 23,
      CXType_NullPtr: 24,
      CXType_Overload: 25,
      CXType_Dependent: 26,
      CXType_ObjCId: 27,
      CXType_ObjCClass: 28,
      CXType_ObjCSel: 29,
      CXType_Float128: 30,
      CXType_Half: 31,
      CXType_Float16: 32,
      CXType_ShortAccum: 33,
      CXType_Accum: 34,
      CXType_LongAccum: 35,
      CXType_UShortAccum: 36,
      CXType_UAccum: 37,
      CXType_ULongAccum: 38,
      CXType_BFloat16: 39,
      CXType_FirstBuiltin: 2,
      CXType_LastBuiltin: 39,
      CXType_Complex: 100,
      CXType_Pointer: 101,
      CXType_BlockPointer: 102,
      CXType_LValueReference: 103,
      CXType_RValueReference: 104,
      CXType_Record: 105,
      CXType_Enum: 106,
      CXType_Typedef: 107,
      CXType_ObjCInterface: 108,
      CXType_ObjCObjectPointer: 109,
      CXType_FunctionNoProto: 110,
      CXType_FunctionProto: 111,
      CXType_ConstantArray: 112,
      CXType_Vector: 113,
      CXType_IncompleteArray: 114,
      CXType_VariableArray: 115,
      CXType_DependentSizedArray: 116,
      CXType_MemberPointer: 117,
      CXType_Auto: 118,
      CXType_Elaborated: 119,
      CXType_Pipe: 120,
      CXType_OCLImage1dRO: 121,
      CXType_OCLImage1dArrayRO: 122,
      CXType_OCLImage1dBufferRO: 123,
      CXType_OCLImage2dRO: 124,
      CXType_OCLImage2dArrayRO: 125,
      CXType_OCLImage2dDepthRO: 126,
      CXType_OCLImage2dArrayDepthRO: 127,
      CXType_OCLImage2dMSAARO: 128,
      CXType_OCLImage2dArrayMSAARO: 129,
      CXType_OCLImage2dMSAADepthRO: 130,
      CXType_OCLImage2dArrayMSAADepthRO: 131,
      CXType_OCLImage3dRO: 132,
      CXType_OCLImage1dWO: 133,
      CXType_OCLImage1dArrayWO: 134,
      CXType_OCLImage1dBufferWO: 135,
      CXType_OCLImage2dWO: 136,
      CXType_OCLImage2dArrayWO: 137,
      CXType_OCLImage2dDepthWO: 138,
      CXType_OCLImage2dArrayDepthWO: 139,
      CXType_OCLImage2dMSAAWO: 140,
      CXType_OCLImage2dArrayMSAAWO: 141,
      CXType_OCLImage2dMSAADepthWO: 142,
      CXType_OCLImage2dArrayMSAADepthWO: 143,
      CXType_OCLImage3dWO: 144,
      CXType_OCLImage1dRW: 145,
      CXType_OCLImage1dArrayRW: 146,
      CXType_OCLImage1dBufferRW: 147,
      CXType_OCLImage2dRW: 148,
      CXType_OCLImage2dArrayRW: 149,
      CXType_OCLImage2dDepthRW: 150,
      CXType_OCLImage2dArrayDepthRW: 151,
      CXType_OCLImage2dMSAARW: 152,
      CXType_OCLImage2dArrayMSAARW: 153,
      CXType_OCLImage2dMSAADepthRW: 154,
      CXType_OCLImage2dArrayMSAADepthRW: 155,
      CXType_OCLImage3dRW: 156,
      CXType_OCLSampler: 157,
      CXType_OCLEvent: 158,
      CXType_OCLQueue: 159,
      CXType_OCLReserveID: 160,
      CXType_ObjCObject: 161,
      CXType_ObjCTypeParam: 162,
      CXType_Attributed: 163,
      CXType_OCLIntelSubgroupAVCMcePayload: 164,
      CXType_OCLIntelSubgroupAVCImePayload: 165,
      CXType_OCLIntelSubgroupAVCRefPayload: 166,
      CXType_OCLIntelSubgroupAVCSicPayload: 167,
      CXType_OCLIntelSubgroupAVCMceResult: 168,
      CXType_OCLIntelSubgroupAVCImeResult: 169,
      CXType_OCLIntelSubgroupAVCRefResult: 170,
      CXType_OCLIntelSubgroupAVCSicResult: 171,
      CXType_OCLIntelSubgroupAVCImeResultSingleRefStreamout: 172,
      CXType_OCLIntelSubgroupAVCImeResultDualRefStreamout: 173,
      CXType_OCLIntelSubgroupAVCImeSingleRefStreamin: 174,
      CXType_OCLIntelSubgroupAVCImeDualRefStreamin: 175,
      CXType_ExtVector: 176,
      CXType_Atomic: 177,
      "0": "CXType_Invalid",
      "1": "CXType_Unexposed",
      "2": "CXType_Void",
      "3": "CXType_Bool",
      "4": "CXType_Char_U",
      "5": "CXType_UChar",
      "6": "CXType_Char16",
      "7": "CXType_Char32",
      "8": "CXType_UShort",
      "9": "CXType_UInt",
      "10": "CXType_ULong",
      "11": "CXType_ULongLong",
      "12": "CXType_UInt128",
      "13": "CXType_Char_S",
      "14": "CXType_SChar",
      "15": "CXType_WChar",
      "16": "CXType_Short",
      "17": "CXType_Int",
      "18": "CXType_Long",
      "19": "CXType_LongLong",
      "20": "CXType_Int128",
      "21": "CXType_Float",
      "22": "CXType_Double",
      "23": "CXType_LongDouble",
      "24": "CXType_NullPtr",
      "25": "CXType_Overload",
      "26": "CXType_Dependent",
      "27": "CXType_ObjCId",
      "28": "CXType_ObjCClass",
      "29": "CXType_ObjCSel",
      "30": "CXType_Float128",
      "31": "CXType_Half",
      "32": "CXType_Float16",
      "33": "CXType_ShortAccum",
      "34": "CXType_Accum",
      "35": "CXType_LongAccum",
      "36": "CXType_UShortAccum",
      "37": "CXType_UAccum",
      "38": "CXType_ULongAccum",
      "39": "CXType_BFloat16",
      "2": "CXType_FirstBuiltin",
      "39": "CXType_LastBuiltin",
      "100": "CXType_Complex",
      "101": "CXType_Pointer",
      "102": "CXType_BlockPointer",
      "103": "CXType_LValueReference",
      "104": "CXType_RValueReference",
      "105": "CXType_Record",
      "106": "CXType_Enum",
      "107": "CXType_Typedef",
      "108": "CXType_ObjCInterface",
      "109": "CXType_ObjCObjectPointer",
      "110": "CXType_FunctionNoProto",
      "111": "CXType_FunctionProto",
      "112": "CXType_ConstantArray",
      "113": "CXType_Vector",
      "114": "CXType_IncompleteArray",
      "115": "CXType_VariableArray",
      "116": "CXType_DependentSizedArray",
      "117": "CXType_MemberPointer",
      "118": "CXType_Auto",
      "119": "CXType_Elaborated",
      "120": "CXType_Pipe",
      "121": "CXType_OCLImage1dRO",
      "122": "CXType_OCLImage1dArrayRO",
      "123": "CXType_OCLImage1dBufferRO",
      "124": "CXType_OCLImage2dRO",
      "125": "CXType_OCLImage2dArrayRO",
      "126": "CXType_OCLImage2dDepthRO",
      "127": "CXType_OCLImage2dArrayDepthRO",
      "128": "CXType_OCLImage2dMSAARO",
      "129": "CXType_OCLImage2dArrayMSAARO",
      "130": "CXType_OCLImage2dMSAADepthRO",
      "131": "CXType_OCLImage2dArrayMSAADepthRO",
      "132": "CXType_OCLImage3dRO",
      "133": "CXType_OCLImage1dWO",
      "134": "CXType_OCLImage1dArrayWO",
      "135": "CXType_OCLImage1dBufferWO",
      "136": "CXType_OCLImage2dWO",
      "137": "CXType_OCLImage2dArrayWO",
      "138": "CXType_OCLImage2dDepthWO",
      "139": "CXType_OCLImage2dArrayDepthWO",
      "140": "CXType_OCLImage2dMSAAWO",
      "141": "CXType_OCLImage2dArrayMSAAWO",
      "142": "CXType_OCLImage2dMSAADepthWO",
      "143": "CXType_OCLImage2dArrayMSAADepthWO",
      "144": "CXType_OCLImage3dWO",
      "145": "CXType_OCLImage1dRW",
      "146": "CXType_OCLImage1dArrayRW",
      "147": "CXType_OCLImage1dBufferRW",
      "148": "CXType_OCLImage2dRW",
      "149": "CXType_OCLImage2dArrayRW",
      "150": "CXType_OCLImage2dDepthRW",
      "151": "CXType_OCLImage2dArrayDepthRW",
      "152": "CXType_OCLImage2dMSAARW",
      "153": "CXType_OCLImage2dArrayMSAARW",
      "154": "CXType_OCLImage2dMSAADepthRW",
      "155": "CXType_OCLImage2dArrayMSAADepthRW",
      "156": "CXType_OCLImage3dRW",
      "157": "CXType_OCLSampler",
      "158": "CXType_OCLEvent",
      "159": "CXType_OCLQueue",
      "160": "CXType_OCLReserveID",
      "161": "CXType_ObjCObject",
      "162": "CXType_ObjCTypeParam",
      "163": "CXType_Attributed",
      "164": "CXType_OCLIntelSubgroupAVCMcePayload",
      "165": "CXType_OCLIntelSubgroupAVCImePayload",
      "166": "CXType_OCLIntelSubgroupAVCRefPayload",
      "167": "CXType_OCLIntelSubgroupAVCSicPayload",
      "168": "CXType_OCLIntelSubgroupAVCMceResult",
      "169": "CXType_OCLIntelSubgroupAVCImeResult",
      "170": "CXType_OCLIntelSubgroupAVCRefResult",
      "171": "CXType_OCLIntelSubgroupAVCSicResult",
      "172": "CXType_OCLIntelSubgroupAVCImeResultSingleRefStreamout",
      "173": "CXType_OCLIntelSubgroupAVCImeResultDualRefStreamout",
      "174": "CXType_OCLIntelSubgroupAVCImeSingleRefStreamin",
      "175": "CXType_OCLIntelSubgroupAVCImeDualRefStreamin",
      "176": "CXType_ExtVector",
      "177": "CXType_Atomic",
  },
  "CXTypeLayoutError": {
      CXTypeLayoutError_Invalid: -1,
      CXTypeLayoutError_Incomplete: -2,
      CXTypeLayoutError_Dependent: -3,
      CXTypeLayoutError_NotConstantSize: -4,
      CXTypeLayoutError_InvalidFieldName: -5,
      CXTypeLayoutError_Undeduced: -6,
      "-1": "CXTypeLayoutError_Invalid",
      "-2": "CXTypeLayoutError_Incomplete",
      "-3": "CXTypeLayoutError_Dependent",
      "-4": "CXTypeLayoutError_NotConstantSize",
      "-5": "CXTypeLayoutError_InvalidFieldName",
      "-6": "CXTypeLayoutError_Undeduced",
  },
  "CXTypeNullabilityKind": {
      CXTypeNullability_NonNull: 0,
      CXTypeNullability_Nullable: 1,
      CXTypeNullability_Unspecified: 2,
      CXTypeNullability_Invalid: 3,
      CXTypeNullability_NullableResult: 4,
      "0": "CXTypeNullability_NonNull",
      "1": "CXTypeNullability_Nullable",
      "2": "CXTypeNullability_Unspecified",
      "3": "CXTypeNullability_Invalid",
      "4": "CXTypeNullability_NullableResult",
  },
  "CXVisibilityKind": {
      CXVisibility_Invalid: 0,
      CXVisibility_Hidden: 1,
      CXVisibility_Protected: 2,
      CXVisibility_Default: 3,
      "0": "CXVisibility_Invalid",
      "1": "CXVisibility_Hidden",
      "2": "CXVisibility_Protected",
      "3": "CXVisibility_Default",
  },
  "CXVisitorResult": {
      CXVisit_Break: 0,
      CXVisit_Continue: 1,
      "0": "CXVisit_Break",
      "1": "CXVisit_Continue",
  },
  "CX_CXXAccessSpecifier": {
      CX_CXXInvalidAccessSpecifier: 0,
      CX_CXXPublic: 1,
      CX_CXXProtected: 2,
      CX_CXXPrivate: 3,
      "0": "CX_CXXInvalidAccessSpecifier",
      "1": "CX_CXXPublic",
      "2": "CX_CXXProtected",
      "3": "CX_CXXPrivate",
  },
  "CX_StorageClass": {
      CX_SC_Invalid: 0,
      CX_SC_None: 1,
      CX_SC_Extern: 2,
      CX_SC_Static: 3,
      CX_SC_PrivateExtern: 4,
      CX_SC_OpenCLWorkGroupLocal: 5,
      CX_SC_Auto: 6,
      CX_SC_Register: 7,
      "0": "CX_SC_Invalid",
      "1": "CX_SC_None",
      "2": "CX_SC_Extern",
      "3": "CX_SC_Static",
      "4": "CX_SC_PrivateExtern",
      "5": "CX_SC_OpenCLWorkGroupLocal",
      "6": "CX_SC_Auto",
      "7": "CX_SC_Register",
  },
};

// NOTE: defining individual types as "global" constants to be able to reference them without any prefix.
const types = {};

const js_uchar = ref.types.uchar;
const js_CString = ref.types.CString;
const js_void = ref.types.void;
const js_voidPointer = ref.refType(js_void);
const js_uint32 = ref.types.uint32;
const CXString = Struct({
  data: js_voidPointer,
  private_flags: js_uint32,
})
;
const CXStringPointer = ref.refType(CXString);
const CXStringSet = Struct({
  Strings: CXStringPointer,
  Count: js_uint32,
})
;
const CXStringSetPointer = ref.refType(CXStringSet);
const js_ulonglong = ref.types.ulonglong;
const CXVirtualFileOverlayImpl = js_voidPointer;
const CXVirtualFileOverlay = CXVirtualFileOverlayImpl;
const js_int32 = ref.types.int32;
const js_uint32Pointer = ref.refType(js_uint32);
const CXModuleMapDescriptorImpl = js_voidPointer;
const CXModuleMapDescriptor = CXModuleMapDescriptorImpl;
const CXIndex = js_voidPointer;
const CXFile = js_voidPointer;
const js_long = ref.types.long;
const __darwin_time_t = js_long;
const time_t = __darwin_time_t;
const js_ulonglong_array_3 = ArrayType(js_ulonglong, 3)
;
const CXFileUniqueID = Struct({
  data: js_ulonglong_array_3,
})
;
const CXFileUniqueIDPointer = ref.refType(CXFileUniqueID);
const CXTranslationUnitImpl = js_voidPointer;
const CXTranslationUnit = CXTranslationUnitImpl;
const js_ulong = ref.types.ulong;
const __darwin_size_t = js_ulong;
const size_t = __darwin_size_t;
const size_tPointer = ref.refType(size_t);
const js_voidPointer_array_2 = ArrayType(js_voidPointer, 2)
;
const CXSourceLocation = Struct({
  ptr_data: js_voidPointer_array_2,
  int_data: js_uint32,
})
;
const CXSourceRange = Struct({
  ptr_data: js_voidPointer_array_2,
  begin_int_data: js_uint32,
  end_int_data: js_uint32,
})
;
const CXFilePointer = ref.refType(CXFile);
const CXSourceRangePointer = ref.refType(CXSourceRange);
const CXSourceRangeList = Struct({
  count: js_uint32,
  ranges: CXSourceRangePointer,
})
;
const CXSourceRangeListPointer = ref.refType(CXSourceRangeList);
const CXDiagnosticSet = js_voidPointer;
const CXDiagnostic = js_voidPointer;
const CXUnsavedFile = Struct({
  Filename: js_CString,
  Contents: js_CString,
  Length: js_ulong,
})
;
const CXTranslationUnitPointer = ref.refType(CXTranslationUnit);
const CXTUResourceUsageEntry = Struct({
  kind: js_uint32,
  amount: js_ulong,
})
;
const CXTUResourceUsageEntryPointer = ref.refType(CXTUResourceUsageEntry);
const CXTUResourceUsage = Struct({
  data: js_voidPointer,
  numEntries: js_uint32,
  entries: CXTUResourceUsageEntryPointer,
})
;
const CXTargetInfoImpl = js_voidPointer;
const CXTargetInfo = CXTargetInfoImpl;
const js_voidPointer_array_3 = ArrayType(js_voidPointer, 3)
;
const CXCursor = Struct({
  kind: js_uint32,
  xdata: js_int32,
  data: js_voidPointer_array_3,
})
;
const js_int32Pointer = ref.refType(js_int32);
const CXVersion = Struct({
  Major: js_int32,
  Minor: js_int32,
  Subminor: js_int32,
})
;
const CXPlatformAvailability = Struct({
  Platform: CXString,
  Introduced: CXVersion,
  Deprecated: CXVersion,
  Obsoleted: CXVersion,
  Unavailable: js_int32,
  Message: CXString,
})
;
const CXPlatformAvailabilityPointer = ref.refType(CXPlatformAvailability);
const CXCursorSetImpl = js_voidPointer;
const CXCursorSet = CXCursorSetImpl;
const CXCursorPointer = ref.refType(CXCursor);
const CXType = Struct({
  kind: js_uint32,
  data: js_voidPointer_array_2,
})
;
const js_longlong = ref.types.longlong;
const CXCursorVisitor = FFI.Function(ref.types.uint32, [
  CXCursor,
  CXCursor,
  js_voidPointer,
])
;
const CXClientData = js_voidPointer;
const CXCursorVisitorBlock = js_voidPointer;
const CXPrintingPolicy = js_voidPointer;
const CXModule = js_voidPointer;
const js_uint32_array_4 = ArrayType(js_uint32, 4)
;
const CXToken = Struct({
  int_data: js_uint32_array_4,
  ptr_data: js_voidPointer,
})
;
const CXTokenPointer = ref.refType(CXToken);
const CXTokenKind = js_uint32;
const FunctionProto_0 = FFI.Function(ref.types.void, [
  js_voidPointer,
])
;
const CXCompletionString = js_voidPointer;
const CXCompletionResult = Struct({
  CursorKind: js_uint32,
  CompletionString: CXCompletionString,
})
;
const CXCompletionResultPointer = ref.refType(CXCompletionResult);
const CXCodeCompleteResults = Struct({
  Results: CXCompletionResultPointer,
  NumResults: js_uint32,
})
;
const CXCodeCompleteResultsPointer = ref.refType(CXCodeCompleteResults);
const CXInclusionVisitor = FFI.Function(ref.types.void, [
  js_voidPointer,
  CXSourceLocation,
  js_uint32,
  js_voidPointer,
])
;
const CXEvalResult = js_voidPointer;
const CXEvalResultKind = js_uint32;
const js_double = ref.types.double;
const CXRemapping = js_voidPointer;
const CXResult = js_uint32;
const FunctionProto_1 = FFI.Function(ref.types.uint32, [
  js_voidPointer,
  CXCursor,
  CXSourceRange,
])
;
const CXCursorAndRangeVisitor = Struct({
  context: js_voidPointer,
  visit: FunctionProto_1,
})
;
const CXCursorAndRangeVisitorBlock = js_voidPointer;
const CXIdxEntityKind = js_uint32;
const CXIdxEntityCXXTemplateKind = js_uint32;
const CXIdxEntityLanguage = js_uint32;
const CXIdxAttrKind = js_uint32;
const CXIdxLoc = Struct({
  ptr_data: js_voidPointer_array_2,
  int_data: js_uint32,
})
;
const CXIdxAttrInfo = Struct({
  kind: CXIdxAttrKind,
  cursor: CXCursor,
  loc: CXIdxLoc,
})
;
const CXIdxAttrInfoPointer = ref.refType(CXIdxAttrInfo);
const CXIdxEntityInfo = Struct({
  kind: CXIdxEntityKind,
  templateKind: CXIdxEntityCXXTemplateKind,
  lang: CXIdxEntityLanguage,
  name: js_CString,
  USR: js_CString,
  cursor: CXCursor,
  attributes: CXIdxAttrInfoPointer,
  numAttributes: js_uint32,
})
;
const CXIdxEntityInfoPointer = ref.refType(CXIdxEntityInfo);
const CXIdxContainerInfo = Struct({
  cursor: CXCursor,
})
;
const CXIdxContainerInfoPointer = ref.refType(CXIdxContainerInfo);
const CXIdxDeclInfo = Struct({
  entityInfo: CXIdxEntityInfoPointer,
  cursor: CXCursor,
  loc: CXIdxLoc,
  semanticContainer: CXIdxContainerInfoPointer,
  lexicalContainer: CXIdxContainerInfoPointer,
  isRedeclaration: js_int32,
  isDefinition: js_int32,
  isContainer: js_int32,
  declAsContainer: CXIdxContainerInfoPointer,
  isImplicit: js_int32,
  attributes: CXIdxAttrInfoPointer,
  numAttributes: js_uint32,
  flags: js_uint32,
})
;
const CXIdxDeclInfoPointer = ref.refType(CXIdxDeclInfo);
const CXIdxObjCContainerKind = js_uint32;
const CXIdxObjCContainerDeclInfo = Struct({
  declInfo: CXIdxDeclInfoPointer,
  kind: CXIdxObjCContainerKind,
})
;
const CXIdxObjCContainerDeclInfoPointer = ref.refType(CXIdxObjCContainerDeclInfo);
const CXIdxBaseClassInfo = Struct({
  base: CXIdxEntityInfoPointer,
  cursor: CXCursor,
  loc: CXIdxLoc,
})
;
const CXIdxBaseClassInfoPointer = ref.refType(CXIdxBaseClassInfo);
const CXIdxObjCProtocolRefInfo = Struct({
  protocol: CXIdxEntityInfoPointer,
  cursor: CXCursor,
  loc: CXIdxLoc,
})
;
const CXIdxObjCProtocolRefInfoPointer = ref.refType(CXIdxObjCProtocolRefInfo);
const CXIdxObjCProtocolRefListInfo = Struct({
  protocols: CXIdxObjCProtocolRefInfoPointer,
  numProtocols: js_uint32,
})
;
const CXIdxObjCProtocolRefListInfoPointer = ref.refType(CXIdxObjCProtocolRefListInfo);
const CXIdxObjCInterfaceDeclInfo = Struct({
  containerInfo: CXIdxObjCContainerDeclInfoPointer,
  superInfo: CXIdxBaseClassInfoPointer,
  protocols: CXIdxObjCProtocolRefListInfoPointer,
})
;
const CXIdxObjCInterfaceDeclInfoPointer = ref.refType(CXIdxObjCInterfaceDeclInfo);
const CXIdxObjCCategoryDeclInfo = Struct({
  containerInfo: CXIdxObjCContainerDeclInfoPointer,
  objcClass: CXIdxEntityInfoPointer,
  classCursor: CXCursor,
  classLoc: CXIdxLoc,
  protocols: CXIdxObjCProtocolRefListInfoPointer,
})
;
const CXIdxObjCCategoryDeclInfoPointer = ref.refType(CXIdxObjCCategoryDeclInfo);
const CXIdxObjCPropertyDeclInfo = Struct({
  declInfo: CXIdxDeclInfoPointer,
  getter: CXIdxEntityInfoPointer,
  setter: CXIdxEntityInfoPointer,
})
;
const CXIdxObjCPropertyDeclInfoPointer = ref.refType(CXIdxObjCPropertyDeclInfo);
const CXIdxIBOutletCollectionAttrInfo = Struct({
  attrInfo: CXIdxAttrInfoPointer,
  objcClass: CXIdxEntityInfoPointer,
  classCursor: CXCursor,
  classLoc: CXIdxLoc,
})
;
const CXIdxIBOutletCollectionAttrInfoPointer = ref.refType(CXIdxIBOutletCollectionAttrInfo);
const CXIdxCXXClassDeclInfo = Struct({
  declInfo: CXIdxDeclInfoPointer,
  bases: CXIdxBaseClassInfoPointer,
  numBases: js_uint32,
})
;
const CXIdxCXXClassDeclInfoPointer = ref.refType(CXIdxCXXClassDeclInfo);
const CXIdxClientContainer = js_voidPointer;
const CXIdxClientEntity = js_voidPointer;
const CXIndexAction = js_voidPointer;
const FunctionProto_2 = FFI.Function(ref.types.int32, [
  CXClientData,
  js_voidPointer,
])
;
const FunctionProto_3 = FFI.Function(ref.types.void, [
  CXClientData,
  CXDiagnosticSet,
  js_voidPointer,
])
;
const CXIdxClientFile = js_voidPointer;
const FunctionProto_4 = FFI.Function(js_voidPointer, [
  CXClientData,
  CXFile,
  js_voidPointer,
])
;
const CXIdxIncludedFileInfo = Struct({
  hashLoc: CXIdxLoc,
  filename: js_CString,
  file: CXFile,
  isImport: js_int32,
  isAngled: js_int32,
  isModuleImport: js_int32,
})
;
const CXIdxIncludedFileInfoPointer = ref.refType(CXIdxIncludedFileInfo);
const FunctionProto_5 = FFI.Function(js_voidPointer, [
  CXClientData,
  CXIdxIncludedFileInfoPointer,
])
;
const CXIdxClientASTFile = js_voidPointer;
const CXIdxImportedASTFileInfo = Struct({
  file: CXFile,
  module: CXModule,
  loc: CXIdxLoc,
  isImplicit: js_int32,
})
;
const CXIdxImportedASTFileInfoPointer = ref.refType(CXIdxImportedASTFileInfo);
const FunctionProto_6 = FFI.Function(js_voidPointer, [
  CXClientData,
  CXIdxImportedASTFileInfoPointer,
])
;
const FunctionProto_7 = FFI.Function(js_voidPointer, [
  CXClientData,
  js_voidPointer,
])
;
const FunctionProto_8 = FFI.Function(ref.types.void, [
  CXClientData,
  CXIdxDeclInfoPointer,
])
;
const CXIdxEntityRefKind = js_uint32;
const CXSymbolRole = js_uint32;
const CXIdxEntityRefInfo = Struct({
  kind: CXIdxEntityRefKind,
  cursor: CXCursor,
  loc: CXIdxLoc,
  referencedEntity: CXIdxEntityInfoPointer,
  parentEntity: CXIdxEntityInfoPointer,
  container: CXIdxContainerInfoPointer,
  role: CXSymbolRole,
})
;
const CXIdxEntityRefInfoPointer = ref.refType(CXIdxEntityRefInfo);
const FunctionProto_9 = FFI.Function(ref.types.void, [
  CXClientData,
  CXIdxEntityRefInfoPointer,
])
;
const IndexerCallbacks = Struct({
  abortQuery: FunctionProto_2,
  diagnostic: FunctionProto_3,
  enteredMainFile: FunctionProto_4,
  ppIncludedFile: FunctionProto_5,
  importedASTFile: FunctionProto_6,
  startedTranslationUnit: FunctionProto_7,
  indexDeclaration: FunctionProto_8,
  indexEntityReference: FunctionProto_9,
})
;
const IndexerCallbacksPointer = ref.refType(IndexerCallbacks);
const CXIdxClientFilePointer = ref.refType(CXIdxClientFile);
const CXFieldVisitor = FFI.Function(ref.types.uint32, [
  CXCursor,
  js_voidPointer,
])
;

types.["CXClientData"] = CXClientData;
types.["CXCodeCompleteResults"] = CXCodeCompleteResults;
types.["CXCodeCompleteResultsPointer"] = CXCodeCompleteResultsPointer;
types.["CXCompletionResult"] = CXCompletionResult;
types.["CXCompletionResultPointer"] = CXCompletionResultPointer;
types.["CXCompletionString"] = CXCompletionString;
types.["CXCursor"] = CXCursor;
types.["CXCursorAndRangeVisitor"] = CXCursorAndRangeVisitor;
types.["CXCursorAndRangeVisitorBlock"] = CXCursorAndRangeVisitorBlock;
types.["CXCursorPointer"] = CXCursorPointer;
types.["CXCursorSet"] = CXCursorSet;
types.["CXCursorSetImpl"] = CXCursorSetImpl;
types.["CXCursorVisitor"] = CXCursorVisitor;
types.["CXCursorVisitorBlock"] = CXCursorVisitorBlock;
types.["CXDiagnostic"] = CXDiagnostic;
types.["CXDiagnosticSet"] = CXDiagnosticSet;
types.["CXEvalResult"] = CXEvalResult;
types.["CXEvalResultKind"] = CXEvalResultKind;
types.["CXFieldVisitor"] = CXFieldVisitor;
types.["CXFile"] = CXFile;
types.["CXFilePointer"] = CXFilePointer;
types.["CXFileUniqueID"] = CXFileUniqueID;
types.["CXFileUniqueIDPointer"] = CXFileUniqueIDPointer;
types.["CXIdxAttrInfo"] = CXIdxAttrInfo;
types.["CXIdxAttrInfoPointer"] = CXIdxAttrInfoPointer;
types.["CXIdxAttrKind"] = CXIdxAttrKind;
types.["CXIdxBaseClassInfo"] = CXIdxBaseClassInfo;
types.["CXIdxBaseClassInfoPointer"] = CXIdxBaseClassInfoPointer;
types.["CXIdxCXXClassDeclInfo"] = CXIdxCXXClassDeclInfo;
types.["CXIdxCXXClassDeclInfoPointer"] = CXIdxCXXClassDeclInfoPointer;
types.["CXIdxClientASTFile"] = CXIdxClientASTFile;
types.["CXIdxClientContainer"] = CXIdxClientContainer;
types.["CXIdxClientEntity"] = CXIdxClientEntity;
types.["CXIdxClientFile"] = CXIdxClientFile;
types.["CXIdxClientFilePointer"] = CXIdxClientFilePointer;
types.["CXIdxContainerInfo"] = CXIdxContainerInfo;
types.["CXIdxContainerInfoPointer"] = CXIdxContainerInfoPointer;
types.["CXIdxDeclInfo"] = CXIdxDeclInfo;
types.["CXIdxDeclInfoPointer"] = CXIdxDeclInfoPointer;
types.["CXIdxEntityCXXTemplateKind"] = CXIdxEntityCXXTemplateKind;
types.["CXIdxEntityInfo"] = CXIdxEntityInfo;
types.["CXIdxEntityInfoPointer"] = CXIdxEntityInfoPointer;
types.["CXIdxEntityKind"] = CXIdxEntityKind;
types.["CXIdxEntityLanguage"] = CXIdxEntityLanguage;
types.["CXIdxEntityRefInfo"] = CXIdxEntityRefInfo;
types.["CXIdxEntityRefInfoPointer"] = CXIdxEntityRefInfoPointer;
types.["CXIdxEntityRefKind"] = CXIdxEntityRefKind;
types.["CXIdxIBOutletCollectionAttrInfo"] = CXIdxIBOutletCollectionAttrInfo;
types.["CXIdxIBOutletCollectionAttrInfoPointer"] = CXIdxIBOutletCollectionAttrInfoPointer;
types.["CXIdxImportedASTFileInfo"] = CXIdxImportedASTFileInfo;
types.["CXIdxImportedASTFileInfoPointer"] = CXIdxImportedASTFileInfoPointer;
types.["CXIdxIncludedFileInfo"] = CXIdxIncludedFileInfo;
types.["CXIdxIncludedFileInfoPointer"] = CXIdxIncludedFileInfoPointer;
types.["CXIdxLoc"] = CXIdxLoc;
types.["CXIdxObjCCategoryDeclInfo"] = CXIdxObjCCategoryDeclInfo;
types.["CXIdxObjCCategoryDeclInfoPointer"] = CXIdxObjCCategoryDeclInfoPointer;
types.["CXIdxObjCContainerDeclInfo"] = CXIdxObjCContainerDeclInfo;
types.["CXIdxObjCContainerDeclInfoPointer"] = CXIdxObjCContainerDeclInfoPointer;
types.["CXIdxObjCContainerKind"] = CXIdxObjCContainerKind;
types.["CXIdxObjCInterfaceDeclInfo"] = CXIdxObjCInterfaceDeclInfo;
types.["CXIdxObjCInterfaceDeclInfoPointer"] = CXIdxObjCInterfaceDeclInfoPointer;
types.["CXIdxObjCPropertyDeclInfo"] = CXIdxObjCPropertyDeclInfo;
types.["CXIdxObjCPropertyDeclInfoPointer"] = CXIdxObjCPropertyDeclInfoPointer;
types.["CXIdxObjCProtocolRefInfo"] = CXIdxObjCProtocolRefInfo;
types.["CXIdxObjCProtocolRefInfoPointer"] = CXIdxObjCProtocolRefInfoPointer;
types.["CXIdxObjCProtocolRefListInfo"] = CXIdxObjCProtocolRefListInfo;
types.["CXIdxObjCProtocolRefListInfoPointer"] = CXIdxObjCProtocolRefListInfoPointer;
types.["CXInclusionVisitor"] = CXInclusionVisitor;
types.["CXIndex"] = CXIndex;
types.["CXIndexAction"] = CXIndexAction;
types.["CXModule"] = CXModule;
types.["CXModuleMapDescriptor"] = CXModuleMapDescriptor;
types.["CXModuleMapDescriptorImpl"] = CXModuleMapDescriptorImpl;
types.["CXPlatformAvailability"] = CXPlatformAvailability;
types.["CXPlatformAvailabilityPointer"] = CXPlatformAvailabilityPointer;
types.["CXPrintingPolicy"] = CXPrintingPolicy;
types.["CXRemapping"] = CXRemapping;
types.["CXResult"] = CXResult;
types.["CXSourceLocation"] = CXSourceLocation;
types.["CXSourceRange"] = CXSourceRange;
types.["CXSourceRangeList"] = CXSourceRangeList;
types.["CXSourceRangeListPointer"] = CXSourceRangeListPointer;
types.["CXSourceRangePointer"] = CXSourceRangePointer;
types.["CXString"] = CXString;
types.["CXStringPointer"] = CXStringPointer;
types.["CXStringSet"] = CXStringSet;
types.["CXStringSetPointer"] = CXStringSetPointer;
types.["CXSymbolRole"] = CXSymbolRole;
types.["CXTUResourceUsage"] = CXTUResourceUsage;
types.["CXTUResourceUsageEntry"] = CXTUResourceUsageEntry;
types.["CXTUResourceUsageEntryPointer"] = CXTUResourceUsageEntryPointer;
types.["CXTargetInfo"] = CXTargetInfo;
types.["CXTargetInfoImpl"] = CXTargetInfoImpl;
types.["CXToken"] = CXToken;
types.["CXTokenKind"] = CXTokenKind;
types.["CXTokenPointer"] = CXTokenPointer;
types.["CXTranslationUnit"] = CXTranslationUnit;
types.["CXTranslationUnitImpl"] = CXTranslationUnitImpl;
types.["CXTranslationUnitPointer"] = CXTranslationUnitPointer;
types.["CXType"] = CXType;
types.["CXUnsavedFile"] = CXUnsavedFile;
types.["CXVersion"] = CXVersion;
types.["CXVirtualFileOverlay"] = CXVirtualFileOverlay;
types.["CXVirtualFileOverlayImpl"] = CXVirtualFileOverlayImpl;
types.["FunctionProto_0"] = FunctionProto_0;
types.["FunctionProto_1"] = FunctionProto_1;
types.["FunctionProto_2"] = FunctionProto_2;
types.["FunctionProto_3"] = FunctionProto_3;
types.["FunctionProto_4"] = FunctionProto_4;
types.["FunctionProto_5"] = FunctionProto_5;
types.["FunctionProto_6"] = FunctionProto_6;
types.["FunctionProto_7"] = FunctionProto_7;
types.["FunctionProto_8"] = FunctionProto_8;
types.["FunctionProto_9"] = FunctionProto_9;
types.["IndexerCallbacks"] = IndexerCallbacks;
types.["IndexerCallbacksPointer"] = IndexerCallbacksPointer;
types.["__darwin_size_t"] = __darwin_size_t;
types.["__darwin_time_t"] = __darwin_time_t;
types.["js_CString"] = js_CString;
types.["js_double"] = js_double;
types.["js_int32"] = js_int32;
types.["js_int32Pointer"] = js_int32Pointer;
types.["js_long"] = js_long;
types.["js_longlong"] = js_longlong;
types.["js_uchar"] = js_uchar;
types.["js_uint32"] = js_uint32;
types.["js_uint32Pointer"] = js_uint32Pointer;
types.["js_uint32_array_4"] = js_uint32_array_4;
types.["js_ulong"] = js_ulong;
types.["js_ulonglong"] = js_ulonglong;
types.["js_ulonglong_array_3"] = js_ulonglong_array_3;
types.["js_void"] = js_void;
types.["js_voidPointer"] = js_voidPointer;
types.["js_voidPointer_array_2"] = js_voidPointer_array_2;
types.["js_voidPointer_array_3"] = js_voidPointer_array_3;
types.["size_t"] = size_t;
types.["size_tPointer"] = size_tPointer;
types.["time_t"] = time_t;

const functions = new FFI.Library("libclang", {
  clang_CXCursorSet_contains: [js_uint32, [
    CXCursorSet,
    CXCursor,
  ]],
  clang_CXCursorSet_insert: [js_uint32, [
    CXCursorSet,
    CXCursor,
  ]],
  clang_CXIndex_getGlobalOptions: [js_uint32, [
    CXIndex,
  ]],
  clang_CXIndex_setGlobalOptions: [js_void, [
    CXIndex,
    js_uint32,
  ]],
  clang_CXIndex_setInvocationEmissionPathOption: [js_void, [
    CXIndex,
    js_CString,
  ]],
  clang_CXXConstructor_isConvertingConstructor: [js_uint32, [
    CXCursor,
  ]],
  clang_CXXConstructor_isCopyConstructor: [js_uint32, [
    CXCursor,
  ]],
  clang_CXXConstructor_isDefaultConstructor: [js_uint32, [
    CXCursor,
  ]],
  clang_CXXConstructor_isMoveConstructor: [js_uint32, [
    CXCursor,
  ]],
  clang_CXXField_isMutable: [js_uint32, [
    CXCursor,
  ]],
  clang_CXXMethod_isConst: [js_uint32, [
    CXCursor,
  ]],
  clang_CXXMethod_isDefaulted: [js_uint32, [
    CXCursor,
  ]],
  clang_CXXMethod_isPureVirtual: [js_uint32, [
    CXCursor,
  ]],
  clang_CXXMethod_isStatic: [js_uint32, [
    CXCursor,
  ]],
  clang_CXXMethod_isVirtual: [js_uint32, [
    CXCursor,
  ]],
  clang_CXXRecord_isAbstract: [js_uint32, [
    CXCursor,
  ]],
  clang_Cursor_Evaluate: [CXEvalResult, [
    CXCursor,
  ]],
  clang_Cursor_getArgument: [CXCursor, [
    CXCursor,
    js_uint32,
  ]],
  clang_Cursor_getBriefCommentText: [CXString, [
    CXCursor,
  ]],
  clang_Cursor_getCXXManglings: [CXStringSetPointer, [
    CXCursor,
  ]],
  clang_Cursor_getCommentRange: [CXSourceRange, [
    CXCursor,
  ]],
  clang_Cursor_getMangling: [CXString, [
    CXCursor,
  ]],
  clang_Cursor_getModule: [CXModule, [
    CXCursor,
  ]],
  clang_Cursor_getNumArguments: [js_int32, [
    CXCursor,
  ]],
  clang_Cursor_getNumTemplateArguments: [js_int32, [
    CXCursor,
  ]],
  clang_Cursor_getObjCDeclQualifiers: [js_uint32, [
    CXCursor,
  ]],
  clang_Cursor_getObjCManglings: [CXStringSetPointer, [
    CXCursor,
  ]],
  clang_Cursor_getObjCPropertyAttributes: [js_uint32, [
    CXCursor,
    js_uint32,
  ]],
  clang_Cursor_getObjCPropertyGetterName: [CXString, [
    CXCursor,
  ]],
  clang_Cursor_getObjCPropertySetterName: [CXString, [
    CXCursor,
  ]],
  clang_Cursor_getObjCSelectorIndex: [js_int32, [
    CXCursor,
  ]],
  clang_Cursor_getOffsetOfField: [js_longlong, [
    CXCursor,
  ]],
  clang_Cursor_getRawCommentText: [CXString, [
    CXCursor,
  ]],
  clang_Cursor_getReceiverType: [CXType, [
    CXCursor,
  ]],
  clang_Cursor_getSpellingNameRange: [CXSourceRange, [
    CXCursor,
    js_uint32,
    js_uint32,
  ]],
  clang_Cursor_getStorageClass: [js_uint32, [
    CXCursor,
  ]],
  clang_Cursor_getTemplateArgumentKind: [js_uint32, [
    CXCursor,
    js_uint32,
  ]],
  clang_Cursor_getTemplateArgumentType: [CXType, [
    CXCursor,
    js_uint32,
  ]],
  clang_Cursor_getTemplateArgumentUnsignedValue: [js_ulonglong, [
    CXCursor,
    js_uint32,
  ]],
  clang_Cursor_getTemplateArgumentValue: [js_longlong, [
    CXCursor,
    js_uint32,
  ]],
  clang_Cursor_getTranslationUnit: [CXTranslationUnit, [
    CXCursor,
  ]],
  clang_Cursor_getVarDeclInitializer: [CXCursor, [
    CXCursor,
  ]],
  clang_Cursor_hasAttrs: [js_uint32, [
    CXCursor,
  ]],
  clang_Cursor_hasVarDeclExternalStorage: [js_int32, [
    CXCursor,
  ]],
  clang_Cursor_hasVarDeclGlobalStorage: [js_int32, [
    CXCursor,
  ]],
  clang_Cursor_isAnonymous: [js_uint32, [
    CXCursor,
  ]],
  clang_Cursor_isAnonymousRecordDecl: [js_uint32, [
    CXCursor,
  ]],
  clang_Cursor_isBitField: [js_uint32, [
    CXCursor,
  ]],
  clang_Cursor_isDynamicCall: [js_int32, [
    CXCursor,
  ]],
  clang_Cursor_isExternalSymbol: [js_uint32, [
    CXCursor,
    CXStringPointer,
    CXStringPointer,
    js_uint32Pointer,
  ]],
  clang_Cursor_isFunctionInlined: [js_uint32, [
    CXCursor,
  ]],
  clang_Cursor_isInlineNamespace: [js_uint32, [
    CXCursor,
  ]],
  clang_Cursor_isMacroBuiltin: [js_uint32, [
    CXCursor,
  ]],
  clang_Cursor_isMacroFunctionLike: [js_uint32, [
    CXCursor,
  ]],
  clang_Cursor_isNull: [js_int32, [
    CXCursor,
  ]],
  clang_Cursor_isObjCOptional: [js_uint32, [
    CXCursor,
  ]],
  clang_Cursor_isVariadic: [js_uint32, [
    CXCursor,
  ]],
  clang_EnumDecl_isScoped: [js_uint32, [
    CXCursor,
  ]],
  clang_EvalResult_dispose: [js_void, [
    CXEvalResult,
  ]],
  clang_EvalResult_getAsDouble: [js_double, [
    CXEvalResult,
  ]],
  clang_EvalResult_getAsInt: [js_int32, [
    CXEvalResult,
  ]],
  clang_EvalResult_getAsLongLong: [js_longlong, [
    CXEvalResult,
  ]],
  clang_EvalResult_getAsStr: [js_CString, [
    CXEvalResult,
  ]],
  clang_EvalResult_getAsUnsigned: [js_ulonglong, [
    CXEvalResult,
  ]],
  clang_EvalResult_getKind: [CXEvalResultKind, [
    CXEvalResult,
  ]],
  clang_EvalResult_isUnsignedInt: [js_uint32, [
    CXEvalResult,
  ]],
  clang_File_isEqual: [js_int32, [
    CXFile,
    CXFile,
  ]],
  clang_File_tryGetRealPathName: [CXString, [
    CXFile,
  ]],
  clang_IndexAction_create: [CXIndexAction, [
    CXIndex,
  ]],
  clang_IndexAction_dispose: [js_void, [
    CXIndexAction,
  ]],
  clang_Location_isFromMainFile: [js_int32, [
    CXSourceLocation,
  ]],
  clang_Location_isInSystemHeader: [js_int32, [
    CXSourceLocation,
  ]],
  clang_ModuleMapDescriptor_create: [CXModuleMapDescriptor, [
    js_uint32,
  ]],
  clang_ModuleMapDescriptor_dispose: [js_void, [
    CXModuleMapDescriptor,
  ]],
  clang_ModuleMapDescriptor_setFrameworkModuleName: [js_uint32, [
    CXModuleMapDescriptor,
    js_CString,
  ]],
  clang_ModuleMapDescriptor_setUmbrellaHeader: [js_uint32, [
    CXModuleMapDescriptor,
    js_CString,
  ]],
  clang_ModuleMapDescriptor_writeToBuffer: [js_uint32, [
    CXModuleMapDescriptor,
    js_uint32,
    js_CString,
    js_uint32Pointer,
  ]],
  clang_Module_getASTFile: [CXFile, [
    CXModule,
  ]],
  clang_Module_getFullName: [CXString, [
    CXModule,
  ]],
  clang_Module_getName: [CXString, [
    CXModule,
  ]],
  clang_Module_getNumTopLevelHeaders: [js_uint32, [
    CXTranslationUnit,
    CXModule,
  ]],
  clang_Module_getParent: [CXModule, [
    CXModule,
  ]],
  clang_Module_getTopLevelHeader: [CXFile, [
    CXTranslationUnit,
    CXModule,
    js_uint32,
  ]],
  clang_Module_isSystem: [js_int32, [
    CXModule,
  ]],
  clang_PrintingPolicy_dispose: [js_void, [
    CXPrintingPolicy,
  ]],
  clang_PrintingPolicy_getProperty: [js_uint32, [
    CXPrintingPolicy,
    js_uint32,
  ]],
  clang_PrintingPolicy_setProperty: [js_void, [
    CXPrintingPolicy,
    js_uint32,
    js_uint32,
  ]],
  clang_Range_isNull: [js_int32, [
    CXSourceRange,
  ]],
  clang_TargetInfo_dispose: [js_void, [
    CXTargetInfo,
  ]],
  clang_TargetInfo_getPointerWidth: [js_int32, [
    CXTargetInfo,
  ]],
  clang_TargetInfo_getTriple: [CXString, [
    CXTargetInfo,
  ]],
  clang_Type_getAlignOf: [js_longlong, [
    CXType,
  ]],
  clang_Type_getCXXRefQualifier: [js_uint32, [
    CXType,
  ]],
  clang_Type_getClassType: [CXType, [
    CXType,
  ]],
  clang_Type_getModifiedType: [CXType, [
    CXType,
  ]],
  clang_Type_getNamedType: [CXType, [
    CXType,
  ]],
  clang_Type_getNullability: [js_uint32, [
    CXType,
  ]],
  clang_Type_getNumObjCProtocolRefs: [js_uint32, [
    CXType,
  ]],
  clang_Type_getNumObjCTypeArgs: [js_uint32, [
    CXType,
  ]],
  clang_Type_getNumTemplateArguments: [js_int32, [
    CXType,
  ]],
  clang_Type_getObjCEncoding: [CXString, [
    CXType,
  ]],
  clang_Type_getObjCObjectBaseType: [CXType, [
    CXType,
  ]],
  clang_Type_getObjCProtocolDecl: [CXCursor, [
    CXType,
    js_uint32,
  ]],
  clang_Type_getObjCTypeArg: [CXType, [
    CXType,
    js_uint32,
  ]],
  clang_Type_getOffsetOf: [js_longlong, [
    CXType,
    js_CString,
  ]],
  clang_Type_getSizeOf: [js_longlong, [
    CXType,
  ]],
  clang_Type_getTemplateArgumentAsType: [CXType, [
    CXType,
    js_uint32,
  ]],
  clang_Type_getValueType: [CXType, [
    CXType,
  ]],
  clang_Type_isTransparentTagTypedef: [js_uint32, [
    CXType,
  ]],
  clang_Type_visitFields: [js_uint32, [
    CXType,
    CXFieldVisitor,
    CXClientData,
  ]],
  clang_VirtualFileOverlay_addFileMapping: [js_uint32, [
    CXVirtualFileOverlay,
    js_CString,
    js_CString,
  ]],
  clang_VirtualFileOverlay_create: [CXVirtualFileOverlay, [
    js_uint32,
  ]],
  clang_VirtualFileOverlay_dispose: [js_void, [
    CXVirtualFileOverlay,
  ]],
  clang_VirtualFileOverlay_setCaseSensitivity: [js_uint32, [
    CXVirtualFileOverlay,
    js_int32,
  ]],
  clang_VirtualFileOverlay_writeToBuffer: [js_uint32, [
    CXVirtualFileOverlay,
    js_uint32,
    js_CString,
    js_uint32Pointer,
  ]],
  clang_annotateTokens: [js_void, [
    CXTranslationUnit,
    CXTokenPointer,
    js_uint32,
    CXCursorPointer,
  ]],
  clang_codeCompleteAt: [CXCodeCompleteResultsPointer, [
    CXTranslationUnit,
    js_CString,
    js_uint32,
    js_uint32,
    CXUnsavedFile,
    js_uint32,
    js_uint32,
  ]],
  clang_codeCompleteGetContainerKind: [js_uint32, [
    CXCodeCompleteResultsPointer,
    js_uint32Pointer,
  ]],
  clang_codeCompleteGetContainerUSR: [CXString, [
    CXCodeCompleteResultsPointer,
  ]],
  clang_codeCompleteGetContexts: [js_ulonglong, [
    CXCodeCompleteResultsPointer,
  ]],
  clang_codeCompleteGetDiagnostic: [CXDiagnostic, [
    CXCodeCompleteResultsPointer,
    js_uint32,
  ]],
  clang_codeCompleteGetNumDiagnostics: [js_uint32, [
    CXCodeCompleteResultsPointer,
  ]],
  clang_codeCompleteGetObjCSelector: [CXString, [
    CXCodeCompleteResultsPointer,
  ]],
  clang_constructUSR_ObjCCategory: [CXString, [
    js_CString,
    js_CString,
  ]],
  clang_constructUSR_ObjCClass: [CXString, [
    js_CString,
  ]],
  clang_constructUSR_ObjCIvar: [CXString, [
    js_CString,
    CXString,
  ]],
  clang_constructUSR_ObjCMethod: [CXString, [
    js_CString,
    js_uint32,
    CXString,
  ]],
  clang_constructUSR_ObjCProperty: [CXString, [
    js_CString,
    CXString,
  ]],
  clang_constructUSR_ObjCProtocol: [CXString, [
    js_CString,
  ]],
  clang_createCXCursorSet: [CXCursorSet, [
  ]],
  clang_createIndex: [CXIndex, [
    js_int32,
    js_int32,
  ]],
  clang_createTranslationUnit: [CXTranslationUnit, [
    CXIndex,
    js_CString,
  ]],
  clang_createTranslationUnit2: [js_uint32, [
    CXIndex,
    js_CString,
    CXTranslationUnitPointer,
  ]],
  clang_createTranslationUnitFromSourceFile: [CXTranslationUnit, [
    CXIndex,
    js_CString,
    js_int32,
    js_CString,
    js_uint32,
    CXUnsavedFile,
  ]],
  clang_defaultCodeCompleteOptions: [js_uint32, [
  ]],
  clang_defaultDiagnosticDisplayOptions: [js_uint32, [
  ]],
  clang_defaultEditingTranslationUnitOptions: [js_uint32, [
  ]],
  clang_defaultReparseOptions: [js_uint32, [
    CXTranslationUnit,
  ]],
  clang_defaultSaveOptions: [js_uint32, [
    CXTranslationUnit,
  ]],
  clang_disposeCXCursorSet: [js_void, [
    CXCursorSet,
  ]],
  clang_disposeCXPlatformAvailability: [js_void, [
    CXPlatformAvailabilityPointer,
  ]],
  clang_disposeCXTUResourceUsage: [js_void, [
    CXTUResourceUsage,
  ]],
  clang_disposeCodeCompleteResults: [js_void, [
    CXCodeCompleteResultsPointer,
  ]],
  clang_disposeDiagnostic: [js_void, [
    CXDiagnostic,
  ]],
  clang_disposeDiagnosticSet: [js_void, [
    CXDiagnosticSet,
  ]],
  clang_disposeIndex: [js_void, [
    CXIndex,
  ]],
  clang_disposeOverriddenCursors: [js_void, [
    CXCursorPointer,
  ]],
  clang_disposeSourceRangeList: [js_void, [
    CXSourceRangeListPointer,
  ]],
  clang_disposeString: [js_void, [
    CXString,
  ]],
  clang_disposeStringSet: [js_void, [
    CXStringSetPointer,
  ]],
  clang_disposeTokens: [js_void, [
    CXTranslationUnit,
    CXTokenPointer,
    js_uint32,
  ]],
  clang_disposeTranslationUnit: [js_void, [
    CXTranslationUnit,
  ]],
  clang_enableStackTraces: [js_void, [
  ]],
  clang_equalCursors: [js_uint32, [
    CXCursor,
    CXCursor,
  ]],
  clang_equalLocations: [js_uint32, [
    CXSourceLocation,
    CXSourceLocation,
  ]],
  clang_equalRanges: [js_uint32, [
    CXSourceRange,
    CXSourceRange,
  ]],
  clang_equalTypes: [js_uint32, [
    CXType,
    CXType,
  ]],
  clang_executeOnThread: [js_void, [
    FunctionProto_0,
    js_voidPointer,
    js_uint32,
  ]],
  clang_findIncludesInFile: [CXResult, [
    CXTranslationUnit,
    CXFile,
    CXCursorAndRangeVisitor,
  ]],
  clang_findIncludesInFileWithBlock: [CXResult, [
    CXTranslationUnit,
    CXFile,
    CXCursorAndRangeVisitorBlock,
  ]],
  clang_findReferencesInFile: [CXResult, [
    CXCursor,
    CXFile,
    CXCursorAndRangeVisitor,
  ]],
  clang_findReferencesInFileWithBlock: [CXResult, [
    CXCursor,
    CXFile,
    CXCursorAndRangeVisitorBlock,
  ]],
  clang_formatDiagnostic: [CXString, [
    CXDiagnostic,
    js_uint32,
  ]],
  clang_free: [js_void, [
    js_voidPointer,
  ]],
  clang_getAddressSpace: [js_uint32, [
    CXType,
  ]],
  clang_getAllSkippedRanges: [CXSourceRangeListPointer, [
    CXTranslationUnit,
  ]],
  clang_getArgType: [CXType, [
    CXType,
    js_uint32,
  ]],
  clang_getArrayElementType: [CXType, [
    CXType,
  ]],
  clang_getArraySize: [js_longlong, [
    CXType,
  ]],
  clang_getBuildSessionTimestamp: [js_ulonglong, [
  ]],
  clang_getCString: [js_CString, [
    CXString,
  ]],
  clang_getCXTUResourceUsage: [CXTUResourceUsage, [
    CXTranslationUnit,
  ]],
  clang_getCXXAccessSpecifier: [js_uint32, [
    CXCursor,
  ]],
  clang_getCanonicalCursor: [CXCursor, [
    CXCursor,
  ]],
  clang_getCanonicalType: [CXType, [
    CXType,
  ]],
  clang_getChildDiagnostics: [CXDiagnosticSet, [
    CXDiagnostic,
  ]],
  clang_getClangVersion: [CXString, [
  ]],
  clang_getCompletionAnnotation: [CXString, [
    CXCompletionString,
    js_uint32,
  ]],
  clang_getCompletionAvailability: [js_uint32, [
    CXCompletionString,
  ]],
  clang_getCompletionBriefComment: [CXString, [
    CXCompletionString,
  ]],
  clang_getCompletionChunkCompletionString: [CXCompletionString, [
    CXCompletionString,
    js_uint32,
  ]],
  clang_getCompletionChunkKind: [js_uint32, [
    CXCompletionString,
    js_uint32,
  ]],
  clang_getCompletionChunkText: [CXString, [
    CXCompletionString,
    js_uint32,
  ]],
  clang_getCompletionFixIt: [CXString, [
    CXCodeCompleteResultsPointer,
    js_uint32,
    js_uint32,
    CXSourceRangePointer,
  ]],
  clang_getCompletionNumAnnotations: [js_uint32, [
    CXCompletionString,
  ]],
  clang_getCompletionNumFixIts: [js_uint32, [
    CXCodeCompleteResultsPointer,
    js_uint32,
  ]],
  clang_getCompletionParent: [CXString, [
    CXCompletionString,
    js_uint32,
  ]],
  clang_getCompletionPriority: [js_uint32, [
    CXCompletionString,
  ]],
  clang_getCursor: [CXCursor, [
    CXTranslationUnit,
    CXSourceLocation,
  ]],
  clang_getCursorAvailability: [js_uint32, [
    CXCursor,
  ]],
  clang_getCursorCompletionString: [CXCompletionString, [
    CXCursor,
  ]],
  clang_getCursorDefinition: [CXCursor, [
    CXCursor,
  ]],
  clang_getCursorDisplayName: [CXString, [
    CXCursor,
  ]],
  clang_getCursorExceptionSpecificationType: [js_int32, [
    CXCursor,
  ]],
  clang_getCursorExtent: [CXSourceRange, [
    CXCursor,
  ]],
  clang_getCursorKind: [js_uint32, [
    CXCursor,
  ]],
  clang_getCursorKindSpelling: [CXString, [
    js_uint32,
  ]],
  clang_getCursorLanguage: [js_uint32, [
    CXCursor,
  ]],
  clang_getCursorLexicalParent: [CXCursor, [
    CXCursor,
  ]],
  clang_getCursorLinkage: [js_uint32, [
    CXCursor,
  ]],
  clang_getCursorLocation: [CXSourceLocation, [
    CXCursor,
  ]],
  clang_getCursorPlatformAvailability: [js_int32, [
    CXCursor,
    js_int32Pointer,
    CXStringPointer,
    js_int32Pointer,
    CXStringPointer,
    CXPlatformAvailabilityPointer,
    js_int32,
  ]],
  clang_getCursorPrettyPrinted: [CXString, [
    CXCursor,
    CXPrintingPolicy,
  ]],
  clang_getCursorPrintingPolicy: [CXPrintingPolicy, [
    CXCursor,
  ]],
  clang_getCursorReferenceNameRange: [CXSourceRange, [
    CXCursor,
    js_uint32,
    js_uint32,
  ]],
  clang_getCursorReferenced: [CXCursor, [
    CXCursor,
  ]],
  clang_getCursorResultType: [CXType, [
    CXCursor,
  ]],
  clang_getCursorSemanticParent: [CXCursor, [
    CXCursor,
  ]],
  clang_getCursorSpelling: [CXString, [
    CXCursor,
  ]],
  clang_getCursorTLSKind: [js_uint32, [
    CXCursor,
  ]],
  clang_getCursorType: [CXType, [
    CXCursor,
  ]],
  clang_getCursorUSR: [CXString, [
    CXCursor,
  ]],
  clang_getCursorVisibility: [js_uint32, [
    CXCursor,
  ]],
  clang_getDeclObjCTypeEncoding: [CXString, [
    CXCursor,
  ]],
  clang_getDefinitionSpellingAndExtent: [js_void, [
    CXCursor,
    js_CString,
    js_CString,
    js_uint32Pointer,
    js_uint32Pointer,
    js_uint32Pointer,
    js_uint32Pointer,
  ]],
  clang_getDiagnostic: [CXDiagnostic, [
    CXTranslationUnit,
    js_uint32,
  ]],
  clang_getDiagnosticCategory: [js_uint32, [
    CXDiagnostic,
  ]],
  clang_getDiagnosticCategoryName: [CXString, [
    js_uint32,
  ]],
  clang_getDiagnosticCategoryText: [CXString, [
    CXDiagnostic,
  ]],
  clang_getDiagnosticFixIt: [CXString, [
    CXDiagnostic,
    js_uint32,
    CXSourceRangePointer,
  ]],
  clang_getDiagnosticInSet: [CXDiagnostic, [
    CXDiagnosticSet,
    js_uint32,
  ]],
  clang_getDiagnosticLocation: [CXSourceLocation, [
    CXDiagnostic,
  ]],
  clang_getDiagnosticNumFixIts: [js_uint32, [
    CXDiagnostic,
  ]],
  clang_getDiagnosticNumRanges: [js_uint32, [
    CXDiagnostic,
  ]],
  clang_getDiagnosticOption: [CXString, [
    CXDiagnostic,
    CXStringPointer,
  ]],
  clang_getDiagnosticRange: [CXSourceRange, [
    CXDiagnostic,
    js_uint32,
  ]],
  clang_getDiagnosticSetFromTU: [CXDiagnosticSet, [
    CXTranslationUnit,
  ]],
  clang_getDiagnosticSeverity: [js_uint32, [
    CXDiagnostic,
  ]],
  clang_getDiagnosticSpelling: [CXString, [
    CXDiagnostic,
  ]],
  clang_getElementType: [CXType, [
    CXType,
  ]],
  clang_getEnumConstantDeclUnsignedValue: [js_ulonglong, [
    CXCursor,
  ]],
  clang_getEnumConstantDeclValue: [js_longlong, [
    CXCursor,
  ]],
  clang_getEnumDeclIntegerType: [CXType, [
    CXCursor,
  ]],
  clang_getExceptionSpecificationType: [js_int32, [
    CXType,
  ]],
  clang_getExpansionLocation: [js_void, [
    CXSourceLocation,
    CXFilePointer,
    js_uint32Pointer,
    js_uint32Pointer,
    js_uint32Pointer,
  ]],
  clang_getFieldDeclBitWidth: [js_int32, [
    CXCursor,
  ]],
  clang_getFile: [CXFile, [
    CXTranslationUnit,
    js_CString,
  ]],
  clang_getFileContents: [js_CString, [
    CXTranslationUnit,
    CXFile,
    size_tPointer,
  ]],
  clang_getFileLocation: [js_void, [
    CXSourceLocation,
    CXFilePointer,
    js_uint32Pointer,
    js_uint32Pointer,
    js_uint32Pointer,
  ]],
  clang_getFileName: [CXString, [
    CXFile,
  ]],
  clang_getFileTime: [time_t, [
    CXFile,
  ]],
  clang_getFileUniqueID: [js_int32, [
    CXFile,
    CXFileUniqueIDPointer,
  ]],
  clang_getFunctionTypeCallingConv: [js_uint32, [
    CXType,
  ]],
  clang_getIBOutletCollectionType: [CXType, [
    CXCursor,
  ]],
  clang_getIncludedFile: [CXFile, [
    CXCursor,
  ]],
  clang_getInclusions: [js_void, [
    CXTranslationUnit,
    CXInclusionVisitor,
    CXClientData,
  ]],
  clang_getInstantiationLocation: [js_void, [
    CXSourceLocation,
    CXFilePointer,
    js_uint32Pointer,
    js_uint32Pointer,
    js_uint32Pointer,
  ]],
  clang_getLocation: [CXSourceLocation, [
    CXTranslationUnit,
    CXFile,
    js_uint32,
    js_uint32,
  ]],
  clang_getLocationForOffset: [CXSourceLocation, [
    CXTranslationUnit,
    CXFile,
    js_uint32,
  ]],
  clang_getModuleForFile: [CXModule, [
    CXTranslationUnit,
    CXFile,
  ]],
  clang_getNullCursor: [CXCursor, [
  ]],
  clang_getNullLocation: [CXSourceLocation, [
  ]],
  clang_getNullRange: [CXSourceRange, [
  ]],
  clang_getNumArgTypes: [js_int32, [
    CXType,
  ]],
  clang_getNumCompletionChunks: [js_uint32, [
    CXCompletionString,
  ]],
  clang_getNumDiagnostics: [js_uint32, [
    CXTranslationUnit,
  ]],
  clang_getNumDiagnosticsInSet: [js_uint32, [
    CXDiagnosticSet,
  ]],
  clang_getNumElements: [js_longlong, [
    CXType,
  ]],
  clang_getNumOverloadedDecls: [js_uint32, [
    CXCursor,
  ]],
  clang_getOverloadedDecl: [CXCursor, [
    CXCursor,
    js_uint32,
  ]],
  clang_getOverriddenCursors: [js_void, [
    CXCursor,
    CXCursorPointer,
    js_uint32Pointer,
  ]],
  clang_getPointeeType: [CXType, [
    CXType,
  ]],
  clang_getPresumedLocation: [js_void, [
    CXSourceLocation,
    CXStringPointer,
    js_uint32Pointer,
    js_uint32Pointer,
  ]],
  clang_getRange: [CXSourceRange, [
    CXSourceLocation,
    CXSourceLocation,
  ]],
  clang_getRangeEnd: [CXSourceLocation, [
    CXSourceRange,
  ]],
  clang_getRangeStart: [CXSourceLocation, [
    CXSourceRange,
  ]],
  clang_getRemappings: [CXRemapping, [
    js_CString,
  ]],
  clang_getRemappingsFromFileList: [CXRemapping, [
    js_CString,
    js_uint32,
  ]],
  clang_getResultType: [CXType, [
    CXType,
  ]],
  clang_getSkippedRanges: [CXSourceRangeListPointer, [
    CXTranslationUnit,
    CXFile,
  ]],
  clang_getSpecializedCursorTemplate: [CXCursor, [
    CXCursor,
  ]],
  clang_getSpellingLocation: [js_void, [
    CXSourceLocation,
    CXFilePointer,
    js_uint32Pointer,
    js_uint32Pointer,
    js_uint32Pointer,
  ]],
  clang_getTUResourceUsageName: [js_CString, [
    js_uint32,
  ]],
  clang_getTemplateCursorKind: [js_uint32, [
    CXCursor,
  ]],
  clang_getToken: [CXTokenPointer, [
    CXTranslationUnit,
    CXSourceLocation,
  ]],
  clang_getTokenExtent: [CXSourceRange, [
    CXTranslationUnit,
    CXToken,
  ]],
  clang_getTokenKind: [CXTokenKind, [
    CXToken,
  ]],
  clang_getTokenLocation: [CXSourceLocation, [
    CXTranslationUnit,
    CXToken,
  ]],
  clang_getTokenSpelling: [CXString, [
    CXTranslationUnit,
    CXToken,
  ]],
  clang_getTranslationUnitCursor: [CXCursor, [
    CXTranslationUnit,
  ]],
  clang_getTranslationUnitSpelling: [CXString, [
    CXTranslationUnit,
  ]],
  clang_getTranslationUnitTargetInfo: [CXTargetInfo, [
    CXTranslationUnit,
  ]],
  clang_getTypeDeclaration: [CXCursor, [
    CXType,
  ]],
  clang_getTypeKindSpelling: [CXString, [
    js_uint32,
  ]],
  clang_getTypeSpelling: [CXString, [
    CXType,
  ]],
  clang_getTypedefDeclUnderlyingType: [CXType, [
    CXCursor,
  ]],
  clang_getTypedefName: [CXString, [
    CXType,
  ]],
  clang_hashCursor: [js_uint32, [
    CXCursor,
  ]],
  clang_indexLoc_getCXSourceLocation: [CXSourceLocation, [
    CXIdxLoc,
  ]],
  clang_indexLoc_getFileLocation: [js_void, [
    CXIdxLoc,
    CXIdxClientFilePointer,
    CXFilePointer,
    js_uint32Pointer,
    js_uint32Pointer,
    js_uint32Pointer,
  ]],
  clang_indexSourceFile: [js_int32, [
    CXIndexAction,
    CXClientData,
    IndexerCallbacksPointer,
    js_uint32,
    js_uint32,
    js_CString,
    js_CString,
    js_int32,
    CXUnsavedFile,
    js_uint32,
    CXTranslationUnitPointer,
    js_uint32,
  ]],
  clang_indexSourceFileFullArgv: [js_int32, [
    CXIndexAction,
    CXClientData,
    IndexerCallbacksPointer,
    js_uint32,
    js_uint32,
    js_CString,
    js_CString,
    js_int32,
    CXUnsavedFile,
    js_uint32,
    CXTranslationUnitPointer,
    js_uint32,
  ]],
  clang_indexTranslationUnit: [js_int32, [
    CXIndexAction,
    CXClientData,
    IndexerCallbacksPointer,
    js_uint32,
    js_uint32,
    CXTranslationUnit,
  ]],
  clang_index_getCXXClassDeclInfo: [CXIdxCXXClassDeclInfoPointer, [
    CXIdxDeclInfoPointer,
  ]],
  clang_index_getClientContainer: [CXIdxClientContainer, [
    CXIdxContainerInfoPointer,
  ]],
  clang_index_getClientEntity: [CXIdxClientEntity, [
    CXIdxEntityInfoPointer,
  ]],
  clang_index_getIBOutletCollectionAttrInfo: [CXIdxIBOutletCollectionAttrInfoPointer, [
    CXIdxAttrInfoPointer,
  ]],
  clang_index_getObjCCategoryDeclInfo: [CXIdxObjCCategoryDeclInfoPointer, [
    CXIdxDeclInfoPointer,
  ]],
  clang_index_getObjCContainerDeclInfo: [CXIdxObjCContainerDeclInfoPointer, [
    CXIdxDeclInfoPointer,
  ]],
  clang_index_getObjCInterfaceDeclInfo: [CXIdxObjCInterfaceDeclInfoPointer, [
    CXIdxDeclInfoPointer,
  ]],
  clang_index_getObjCPropertyDeclInfo: [CXIdxObjCPropertyDeclInfoPointer, [
    CXIdxDeclInfoPointer,
  ]],
  clang_index_getObjCProtocolRefListInfo: [CXIdxObjCProtocolRefListInfoPointer, [
    CXIdxDeclInfoPointer,
  ]],
  clang_index_isEntityObjCContainerKind: [js_int32, [
    CXIdxEntityKind,
  ]],
  clang_index_setClientContainer: [js_void, [
    CXIdxContainerInfoPointer,
    CXIdxClientContainer,
  ]],
  clang_index_setClientEntity: [js_void, [
    CXIdxEntityInfoPointer,
    CXIdxClientEntity,
  ]],
  clang_isAttribute: [js_uint32, [
    js_uint32,
  ]],
  clang_isConstQualifiedType: [js_uint32, [
    CXType,
  ]],
  clang_isCursorDefinition: [js_uint32, [
    CXCursor,
  ]],
  clang_isDeclaration: [js_uint32, [
    js_uint32,
  ]],
  clang_isExpression: [js_uint32, [
    js_uint32,
  ]],
  clang_isFileMultipleIncludeGuarded: [js_uint32, [
    CXTranslationUnit,
    CXFile,
  ]],
  clang_isFunctionTypeVariadic: [js_uint32, [
    CXType,
  ]],
  clang_isInvalid: [js_uint32, [
    js_uint32,
  ]],
  clang_isInvalidDeclaration: [js_uint32, [
    CXCursor,
  ]],
  clang_isPODType: [js_uint32, [
    CXType,
  ]],
  clang_isPreprocessing: [js_uint32, [
    js_uint32,
  ]],
  clang_isReference: [js_uint32, [
    js_uint32,
  ]],
  clang_isRestrictQualifiedType: [js_uint32, [
    CXType,
  ]],
  clang_isStatement: [js_uint32, [
    js_uint32,
  ]],
  clang_isTranslationUnit: [js_uint32, [
    js_uint32,
  ]],
  clang_isUnexposed: [js_uint32, [
    js_uint32,
  ]],
  clang_isVirtualBase: [js_uint32, [
    CXCursor,
  ]],
  clang_isVolatileQualifiedType: [js_uint32, [
    CXType,
  ]],
  clang_loadDiagnostics: [CXDiagnosticSet, [
    js_CString,
    js_uint32,
    CXStringPointer,
  ]],
  clang_parseTranslationUnit: [CXTranslationUnit, [
    CXIndex,
    js_CString,
    js_CString,
    js_int32,
    CXUnsavedFile,
    js_uint32,
    js_uint32,
  ]],
  clang_parseTranslationUnit2: [js_uint32, [
    CXIndex,
    js_CString,
    js_CString,
    js_int32,
    CXUnsavedFile,
    js_uint32,
    js_uint32,
    CXTranslationUnitPointer,
  ]],
  clang_parseTranslationUnit2FullArgv: [js_uint32, [
    CXIndex,
    js_CString,
    js_CString,
    js_int32,
    CXUnsavedFile,
    js_uint32,
    js_uint32,
    CXTranslationUnitPointer,
  ]],
  clang_remap_dispose: [js_void, [
    CXRemapping,
  ]],
  clang_remap_getFilenames: [js_void, [
    CXRemapping,
    js_uint32,
    CXStringPointer,
    CXStringPointer,
  ]],
  clang_remap_getNumFiles: [js_uint32, [
    CXRemapping,
  ]],
  clang_reparseTranslationUnit: [js_int32, [
    CXTranslationUnit,
    js_uint32,
    CXUnsavedFile,
    js_uint32,
  ]],
  clang_saveTranslationUnit: [js_int32, [
    CXTranslationUnit,
    js_CString,
    js_uint32,
  ]],
  clang_sortCodeCompletionResults: [js_void, [
    CXCompletionResultPointer,
    js_uint32,
  ]],
  clang_suspendTranslationUnit: [js_uint32, [
    CXTranslationUnit,
  ]],
  clang_toggleCrashRecovery: [js_void, [
    js_uint32,
  ]],
  clang_tokenize: [js_void, [
    CXTranslationUnit,
    CXSourceRange,
    CXTokenPointer,
    js_uint32Pointer,
  ]],
  clang_visitChildren: [js_uint32, [
    CXCursor,
    CXCursorVisitor,
    CXClientData,
  ]],
  clang_visitChildrenWithBlock: [js_uint32, [
    CXCursor,
    CXCursorVisitorBlock,
  ]],
});

module.exports = {
  constants,
  types,
  functions,
};

