package com.chat_application.ChatApplication;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.regex.Pattern;

@SpringBootTest
class ChatApplicationTests {

	@Test
	void contextLoads() {
		String s = "21130407@st.hmcuaf.edu.vn";
		Pattern p = Pattern.compile("^[a-zA-Z][a-zA-Z0-9]+@[a-zA-z]+(\\.[a-zA-Z]+){1,3}$");
		if (p.matcher(s).find()){
			System.out.println("Matched");
		}else System.out.println("Invalid");
	}

}
