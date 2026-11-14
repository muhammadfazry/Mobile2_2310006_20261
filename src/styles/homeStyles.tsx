import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 20,
  },
  welcomeCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    gap: 12,
  },
  statusBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#ECFDF5",
  },
  statusBadgeText: {
    color: "#059669",
    fontSize: 12,
    fontWeight: "600",
  },
  greetingTitle: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "700",
  },
  greetingEmail: {
    color: "#64748B",
    fontSize: 14,
  },
  menuCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  menuHeader: {
    gap: 6,
    marginBottom: 20,
  },
  menuSectionTitle: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "700",
  },
  menuSectionSubtitle: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20,
  },
  menuItem: {
    width: "30%",
    alignItems: "center",
    gap: 8,
  },
  menuIconWrapper: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  iconBgBlue: {
    backgroundColor: "#EFF6FF",
  },
  iconBgGreen: {
    backgroundColor: "#ECFDF5",
  },
  iconBgAmber: {
    backgroundColor: "#FFFBEB",
  },
  iconBgTeal: {
    backgroundColor: "#F0FDFA",
  },
  iconBgRose: {
    backgroundColor: "#FFF1F2",
  },
  menuLabel: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});