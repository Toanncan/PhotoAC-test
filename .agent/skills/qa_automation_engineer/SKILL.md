---
name: QA Automation Engineer
description: Skill ho tro agent thuc hien cac tac vu QA automation testing voi Playwright TypeScript bao gom generate test cases, automation scripts, locators, phan tich flaky tests, va tao test data.
---

# QA Automation Engineer (Playwright TypeScript)

## Mô Tả

Skill này hỗ trợ agent thực hiện các tác vụ kiểm thử và automation với **Playwright + TypeScript**.

Agent có thể:
- Sinh manual test cases từ requirements
- Sinh automation scripts từ test cases hoặc UI flows
- Thiết kế và scaffold automation framework
- Sinh test data
- Phân tích flaky tests
- Sinh locators ổn định

---

## Khi Nào Sử Dụng

Sử dụng skill này khi user hỏi về:
- Test automation với Playwright TypeScript
- Manual testing và sinh test cases
- Thiết kế automation framework
- Kiểm thử giao diện người dùng (UI testing)
- Sinh test data
- Debug flaky test
- Sinh locator

---

## Định Tuyến Workflow

Khi yêu cầu của user khớp với tác vụ cụ thể, chọn workflow phù hợp trong `.agent/workflows/`.

### Sinh test cases từ requirements

Tác vụ này thuộc skill `rbt_manual_testing` — không phải `qa_automation_engineer`.

Sử dụng workflow:
- `generate_testcases_from_requirements` (chế độ QUICK)
- `generate_manual_testcases_rbt` (chế độ FULL RBT)

Kích hoạt khi user nói:
- generate test cases
- write manual test cases
- test scenarios from requirement
- sinh test cases nhanh
- sinh bộ test case bài bản / quy trình 6 bước

---

### Sinh automation từ manual test case

Sử dụng workflow: `generate_automation_from_testcases`

Kích hoạt khi user nói:
- convert test case to automation
- generate Playwright automation from test case
- chuyển test case thành automation

---

### Sinh automation từ UI steps

Sử dụng workflow: `generate_automation_from_ui_flow`

Kích hoạt khi user nói:
- automate this UI flow
- generate automation from steps
- run UI steps and generate Playwright script
- vào trang này, click cái kia, sinh code

---

### Sinh test data

Sử dụng workflow: `generate_test_data`

Kích hoạt khi user nói:
- generate test data
- generate boundary test data
- sinh dữ liệu test

---

### Thiết kế automation framework

Tác vụ này sử dụng skill `framework_architect`.

Sử dụng workflow: `generate_automation_framework`

Kích hoạt khi user nói:
- create automation framework
- design Playwright framework
- scaffold automation project
- thiết kế framework mới

---


### Sinh locators ổn định

Sử dụng skill `smart_locator_agent` kết hợp workflow `generate_locator`.

Kích hoạt khi user nói:
- generate locator for this element
- find stable selector
- create automation locator
- sinh locator ổn định

---

### Phân tích requirement document

Tác vụ này sử dụng skill `requirements_analyzer`.

Sử dụng workflow: `analyze_requirement_document`

Kích hoạt khi user nói:
- phan tich requirement document
- review yeu cau / analyze this ticket
- tim diem mo ho trong requirement

---

## Tech Stack

- **Ngôn ngữ:** TypeScript
- **Framework automation:** Playwright
- **Test runner:** Playwright Test
- **Design pattern:** Page Object Model (POM) + Fixture pattern
- **Reporting:** Allure Report, HTML Report

---

## Thứ Tự Ưu Tiên Locator Playwright

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByTestId()`
6. `css selector`
7. `xpath` (lựa chọn cuối cùng)

Tham chiếu chi tiết: `.agent-playwright/rules/locator_strategy.md`

---

## Tham Chiếu Rules

Agent PHẢI tuân thủ các rules chi tiết trong `.agent-playwright/rules/`:

- `automation_rules.md` — Quy tắc automation chung
- `locator_strategy.md` — Chiến lược chọn locator
- `playwright_rules.md` — Quy tắc riêng cho Playwright

---

## Output

Tùy theo yêu cầu, agent có thể trả về:
- Manual test cases (dạng bảng Markdown)
- Automation scripts (TypeScript + Playwright)
- Locator recommendations
- Test data (có cấu trúc, random, traceable)
- Thiết kế automation framework

Automation output phải bao gồm:
- Page Object classes
- Test classes
- Assertions kiểm tra expected behavior
- Code sạch, dễ đọc, dễ bảo trì (không có debug logs, không có commented code)
